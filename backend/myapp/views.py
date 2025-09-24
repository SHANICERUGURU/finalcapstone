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

# user views
@api_view(['POST'])
def UserPost(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save() 
            
            # Create authentication token
            token, created = Token.objects.get_or_create(user=user)
            
            return Response({
                'user': Userserializer(user).data, 
                'token': token.key,
                'message': 'User registered successfully'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user': Userserializer(user).data,
                'token': token.key,
                'message': 'Login successful'
                })
        else:
            return Response(
                {'error': 'Invalid credentials'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
@api_view(['POST'])
def user_logout(request):
    if request.method == 'POST':
        # Delete the token to logout
        request.user.auth_token.delete()
        return Response({'message': 'Successfully logged out'})
