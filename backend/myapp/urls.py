from django.urls import path
from . import views
from django.contrib.auth import views as auth_views  

urlpatterns = [
    # API URLs
    path('api/patients/', views.patient, name='patient_api'),
    path('api/patients/<int:pk>/', views.patient_detail, name='patient_detail_api'),
    path('api/doctors/', views.doctor_api, name='doctor_api'),
    path('api/doctors/<int:pk>/', views.doctor_detail_api, name= 'doctor_detail'),
    path('api/user/profile/', views.user_profile, name='user_profile_api'),
    path('api/appointments/', views.appointments, name='appointments_api'),
    path('api/appointments/<int:appointment_id>/', views.appointments, name='appointment_detail_api'),
    path('api/appointments/<int:appointment_id>/status/', views.update_appointment_status_api, name='update_appointment_status_api'),
    path('api/doctors/specialties/', views.doctor_specialties, name='doctor_specialties'),
    path('api/doctors/specialty/<str:specialty>/', views.doctors_by_specialty, name='doctors_by_specialty'),
    path('api/doctor/patients/', views.patient_list, name='doctor-patient-list'),
    path('api/doctor/patients/<int:pk>/', views.patient_detail, name='doctor-patient-detail'),
    path('dashboard/', views.dashboard, name='dashboard_api'),
    path('api/doctor/patients/<int:pk>/update/', views.doctor_update_patient, name='doctor-update-patient'),
    
    # authenication urls
    path('api/auth/register/', views.registerUser, name='api-register'),

    # profile setup urls
    path('api/profiles/patient/setup/', views.setup_patient_profile, name='api-setup-patient'),
    path('api/profiles/doctor/setup/', views.setup_doctor_profile, name='api-setup-doctor'),

]