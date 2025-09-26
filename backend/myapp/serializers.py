from .models import *
from rest_framework import serializers

# for reading/updating user info
class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

class PatientSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    class Meta:
        model = Patient
        fields = '__all__'


class DoctorSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    specialty_display = serializers.CharField(source='get_specialty_display', read_only=True)
    class Meta:
        model = Doctor
        fields = '__all__'


class Appointmentserializer(serializers.ModelSerializer):
    user_full_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ('patient',)


# for creating new users with hashed passwords
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            "first_name", "last_name", "username", "email",
            "phone", "gender", "date_of_birth", "role",
            "password", "confirm_password"
        ]

    def validate(self, data):
        if data.get("password") != data.get("confirm_password"):
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password", None)
        user = User.objects.create_user(**validated_data)
        return user


class DoctorPatientSerializer(serializers.ModelSerializer):

    patient_id = serializers.IntegerField(source='id')
    full_name = serializers.SerializerMethodField()
    email = serializers.CharField(source='user.email')
    phone = serializers.CharField(source='user.phone')
    age = serializers.SerializerMethodField()
    last_appointment_date = serializers.DateField(source='last_appointment')
    
    class Meta:
        model = Patient
        fields = '__all__'
    
    def get_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    
    def get_age(self, obj):
        if obj.user.date_of_birth:
            today = timezone.now().date()
            return today.year - obj.user.date_of_birth.year - (
                (today.month, today.day) < 
                (obj.user.date_of_birth.month, obj.user.date_of_birth.day)
            )
        return None

class DoctorPatientDetailSerializer(serializers.ModelSerializer):
    
    user_info = serializers.SerializerMethodField()
    full_medical_history = serializers.SerializerMethodField()
    
    class Meta:
        model = Patient
        fields = '__all__'
    
    def get_user_info(self, obj):
        return {
            'full_name': f"{obj.user.first_name} {obj.user.last_name}",
            'email': obj.user.email,
            'phone': obj.user.phone,
            'date_of_birth': obj.user.date_of_birth,
            'gender': obj.user.get_gender_display(),
            'age': self.calculate_age(obj.user.date_of_birth)
        }
    
    def get_full_medical_history(self, obj):
        return {
            'allergies': obj.allergies,
            'chronic_conditions': obj.chronic_illness,
            'current_medications': obj.current_medications,
            'family_history': obj.family_medical_history,
            'insurance': obj.insurance_type
        }
    
    def calculate_age(self, dob):
        if dob:
            today = timezone.now().date()
            return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
        return None

class DoctorPatientUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            'blood_type',
            'allergies',
            'chronic_illness',
            'current_medications',
            'family_medical_history',
            'emergency_contact_name',
            'emergency_contact_phone',
            'insurance_type',
            'last_appointment',  
            'last_doctor', 
        ]
        extra_kwargs = {
            'blood_type': {'required': False},
            'allergies': {'required': False},
            'chronic_illness': {'required': False},
            'current_medications': {'required': False},
            'family_medical_history': {'required': False},
            'last_appointment': {'required': False},
            'last_doctor': {'required': False},
        }