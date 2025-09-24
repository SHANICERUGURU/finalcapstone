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
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    class Meta:
        model = Patient
        fields = '__all__'


class DoctorSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    specialty_display = serializers.CharField(source='get_specialty_display', read_only=True)
    class Meta:
        model = Doctor
        fields = '__all__'


class Appointmentserializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.user.get_full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.get_full_name', read_only=True)
    class Meta:
        model = Appointment
        fields = '__all__'      


# for creating new users with hashed passwords
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) 
    
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self, validated_data):
        # Custom logic for user creation
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])  # Hash password properly
        user.save()
        return user

