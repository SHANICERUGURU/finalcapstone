from django.shortcuts import render, redirect,get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from .models import *
from django.contrib import messages
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q
from rest_framework.permissions import AllowAny,IsAuthenticated
# patient views
@api_view(['GET', 'POST'])
def patient(request):
    if request.method == 'GET':
        patients = Patient.objects.all()
        serializers = PatientSerializer(patients, many=True)
        return Response(serializers.data)

    elif request.method == 'POST':
        serializers = PatientSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def patient_detail(request, pk):
    try:
        # Get the patient object with proper permission checks
        if request.user.is_doctor():
            # Doctors can access any patient
            patient = Patient.objects.get(pk=pk)
        else:
            # Patients can only access their own profile
            try:
                patient_profile = request.user.patient_profile
                if patient_profile.id != int(pk):
                    return Response(
                        {'error': 'Access denied. You can only access your own profile.'}, 
                        status=status.HTTP_403_FORBIDDEN
                    )
                patient = Patient.objects.get(pk=pk, user=request.user)
            except AttributeError:
                return Response(
                    {'error': 'Patient profile not found'}, 
                    status=status.HTTP_403_FORBIDDEN
                )
    
    except Patient.DoesNotExist:
        return Response(
            {'error': 'Patient not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except ValueError:
        return Response(
            {'error': 'Invalid patient ID'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    # Handle different HTTP methods
    if request.method == 'GET':
        serializers = PatientSerializer(patient)
        return Response(serializers.data)

    elif request.method == 'PUT':
        # For patients, ensure they can only update their own profile
        if not request.user.is_doctor() and patient.user != request.user:
            return Response(
                {'error': 'You can only update your own profile'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializers = PatientSerializer(patient, data=request.data, partial=True)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Only allow doctors to delete patients
        if not request.user.is_doctor():
            return Response(
                {'error': 'Only doctors can delete patient profiles'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        patient.delete()
        return Response(
            {'message': 'Patient profile deleted successfully'}, 
            status=status.HTTP_204_NO_CONTENT
        )

# doctor views
@api_view(['GET','POST'])
def doctor_api(request):
    if request.method == 'GET':
        doctors=Doctor.objects.all()
        serializers=DoctorSerializer(doctors, many=True)
        return Response(serializers.data)
    
    elif request.method == 'POST':
        serializers=DoctorSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def doctor_detail_api(request, pk):
    try:
        doctor = Doctor.objects.get(pk=pk)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = DoctorSerializer(doctor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        doctor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
def doctor_specialties(request):
    specialties = Doctor.Specialty.choices
    return Response(dict(specialties))  

@api_view(['GET'])
def doctors_by_specialty(request, specialty):
    doctors = Doctor.objects.filter(specialty=specialty)
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)  

@api_view(['GET'])
def patient_list(request):
    # --- Access control ---
    if not request.user.is_doctor():
        return Response(
            {'error': 'Doctor access required'},
            status=status.HTTP_403_FORBIDDEN
        )

    if not hasattr(request.user, 'doctor_profile'):
        return Response(
            {'error': 'Doctor profile not found. Please complete your profile.'},
            status=status.HTTP_403_FORBIDDEN
        )

    # --- Query patients ---
    patients = Patient.objects.all().select_related('user')

    #  filter
    search_query = request.GET.get('search', '').strip()
    if search_query:
        patients = patients.filter(
            Q(user__first_name__icontains=search_query) |
            Q(user__last_name__icontains=search_query) |
            Q(user__email__icontains=search_query) |
            Q(blood_type__icontains=search_query)
        )

    # --- Serialize & respond ---
    serializer = DoctorPatientSerializer(patients, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT'])
def patient_detail(request, pk):
    # Check if user is a doctor
    if not request.user.is_doctor():
        return Response(
            {'error': 'Doctor access required'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        # Get the specific patient
        patient = Patient.objects.select_related('user').get(pk=pk)
    except Patient.DoesNotExist:
        return Response(
            {'error': 'Patient not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    if request.method == 'GET':
        # Get patient details with all related data
        patient_serializer = DoctorPatientDetailSerializer(patient)
        
        # Get patient's appointments
        appointments = Appointment.objects.filter(patient=patient).select_related('doctor__user')
        appointment_serializer = Appointmentserializer(appointments, many=True)
        
        return Response({
            'patient': patient_serializer.data,
            'appointments': appointment_serializer.data,
            'appointment_count': appointments.count(),
            'upcoming_appointments': appointments.filter(
                date__gte=timezone.now().date()
            ).count()
        })
    
    elif request.method == 'PUT':
        # Doctors can update medical information (but not user personal info)
        serializer = DoctorPatientUpdateSerializer(patient, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# appointment views
@api_view(['GET', 'POST'])
def appointments(request):
    if request.method == 'GET':
        if request.user.role == 'PATIENT':
            try:
                patient_profile = request.user.patient_profile
                appointments = Appointment.objects.filter(patient=patient_profile)
            except AttributeError:
                return Response({'error': 'Patient profile not found'}, status=status.HTTP_403_FORBIDDEN)
        
        elif request.user.role == 'DOCTOR':
            try:
                doctor_profile = request.user.doctor_profile
                appointments = Appointment.objects.filter(doctor=doctor_profile)
            except AttributeError:
                return Response({'error': 'Doctor profile not found'}, status=status.HTTP_403_FORBIDDEN)
        
        else:  # Admin or other roles
            appointments = Appointment.objects.all()  # Or restrict as needed
        
        serializer = Appointmentserializer(appointments, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        try:
            patient = request.user.patient_profile
            serializer = Appointmentserializer(data=request.data)
            if serializer.is_valid():
                serializer.save(patient=patient)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except AttributeError:
            return Response({'error': 'Patient profile not found'}, status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
       try:
        patient = request.user.patient_profile
        serializer = Appointmentserializer(data=request.data)
        
        if serializer.is_valid():
            # ✅ EXTRA VALIDATION: Check if doctor has the selected specialty
            doctor_id = request.data.get('doctor')
            specialty = request.data.get('specialty')
            
            if doctor_id and specialty:
                try:
                    doctor = Doctor.objects.get(id=doctor_id)
                    if doctor.specialty != specialty:
                        return Response(
                            {'error': 'Doctor specialty mismatch'}, 
                            status=status.HTTP_400_BAD_REQUEST
                        )
                except Doctor.DoesNotExist:
                    return Response(
                        {'error': 'Doctor not found'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            serializer.save(patient=patient)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
       except AttributeError:
        return Response({'error': 'Patient profile not found'}, status=status.HTTP_403_FORBIDDEN)
        
@login_required
def update_appointment_status(request, appointment_id):
    appointment = get_object_or_404(Appointment, id=appointment_id)

    # Check if logged-in user is the doctor assigned to this appointment
    if hasattr(request.user, 'doctor_profile') and appointment.doctor == request.user.doctor_profile:
        if request.method == "POST":
            new_status = request.POST.get("status")
            if new_status in dict(Appointment.appointment_status).keys():
                appointment.status = new_status
                appointment.save()
                messages.success(request, "Appointment status updated.")
        return redirect("doctor_dashboard")
    else:
        messages.error(request, "You are not allowed to update this appointment.")
        return redirect("dashboard")
    
@api_view(['PUT'])
def update_appointment_status_api(request, appointment_id):
    try:
        appointment = Appointment.objects.get(id=appointment_id)

        # Only the doctor assigned to the appointment can update
        if hasattr(request.user, 'doctor_profile') and appointment.doctor == request.user.doctor_profile:
            new_status = request.data.get("status")
            if new_status in dict(Appointment.appointment_status).keys():
                appointment.status = new_status
                appointment.save()
                return Response({'message': 'Appointment status updated'}, status=200)
            return Response({'error': 'Invalid status'}, status=400)
        else:
            return Response({'error': 'Not allowed'}, status=403)
    except Appointment.DoesNotExist:
        return Response({'error': 'Appointment not found'}, status=404)   

# user views
@api_view(['POST'])
@permission_classes([AllowAny])
def registerUser(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save() 
        return Response({
            'user': Userserializer(user).data,
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

    
@api_view(['GET', 'PUT', 'PATCH'])
def user_profile(request):
    user = request.user
    
    if request.method == 'GET':
        serializer = Userserializer(user)
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:  # Support both PUT and PATCH
        partial = (request.method == 'PATCH')
        
        # Use UserSerializer for updates (password is optional)
        serializer = Userserializer(
            user, 
            data=request.data, 
            partial=partial  # Allow partial updates for PATCH
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# profile setup views
@api_view(['POST'])
def setup_patient_profile(request):
    try:
        if hasattr(request.user, 'patient_profile'):
            return Response({'error': 'Profile already exists'}, status=400)

        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # link to logged-in user
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=400) 
    
@api_view(['POST'])
def setup_doctor_profile(request):
    try:
        if hasattr(request.user, 'doctor_profile'):
            return Response({'error': 'Profile already exists'}, status=400)

        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # link to logged-in user
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=400)    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    user = request.user
    
    # Get user's actual profiles
    patient_profile = Patient.objects.filter(user=user).first()
    doctor_profile = Doctor.objects.filter(user=user).first()
    
    # Determine role mismatch
    role_mismatch = False
    profile_type = None
    
    if patient_profile and doctor_profile:
        # User has both profiles - use the one that matches their role
        if user.role == 'patient':
            doctor_profile = None
        else:
            patient_profile = None
    elif user.role == 'patient' and doctor_profile:
        role_mismatch = True
        profile_type = 'doctor'
    elif user.role == 'doctor' and patient_profile:
        role_mismatch = True
        profile_type = 'patient'
    
    data = {
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'full_name': user.get_full_name(),
        },
        'role_mismatch': role_mismatch,
        'profile_type': profile_type
    }
    
    # Add patient data if exists and no mismatch or matches role
    if patient_profile and (user.role == 'patient' or not role_mismatch):
        data['patient'] = {
            'user_full_name': user.get_full_name(),
            'blood_type': patient_profile.blood_type or '',
            'allergies': patient_profile.allergies or '',
            'chronic_illness': patient_profile.chronic_illness or '',
            'date_of_birth': patient_profile.date_of_birth.isoformat() if patient_profile.date_of_birth else None,
            'emergency_contact': patient_profile.emergency_contact or '',
        }
    else:
        data['patient'] = None
    
    # Add doctor data if exists and no mismatch or matches role
    if doctor_profile and (user.role == 'doctor' or not role_mismatch):
        data['doctor'] = {
            'user_full_name': user.get_full_name(),
            'specialty': doctor_profile.specialty or '',
            'hospital': doctor_profile.hospital or '',
            'license_number': doctor_profile.license_number or '',
            'years_of_experience': doctor_profile.years_of_experience or 0,
        }
    else:
        data['doctor'] = None
    
    return Response(data)