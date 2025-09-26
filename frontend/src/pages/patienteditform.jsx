import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const PatientEditForm = ({ patient, show, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    blood_type: '',
    allergies: '',
    chronic_illness: '',
    current_medications: '',
    family_medical_history: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    insurance_type: '',
    last_doctor:'',
    last_appointment:'',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Update form data when patient prop changes
  useEffect(() => {
    if (patient) {
      setFormData({
        blood_type: patient?.blood_type || '',
        allergies: patient?.allergies || '',
        chronic_illness: patient?.chronic_illness || '',
        current_medications: patient?.current_medications || '',
        family_medical_history: patient?.family_medical_history || '',
        emergency_contact_name: patient?.emergency_contact_name || '',
        emergency_contact_phone: patient?.emergency_contact_phone || '',
        insurance_type: patient?.insurance_type || '',
        last_doctor: patient?.last_doctor || '',
        last_appointment: patient?.last_appointment || '',
      });
    }
  }, [patient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onUpdate(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update patient information');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Patient Information</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Blood Type</Form.Label>
                <Form.Select 
                  name="blood_type"
                  value={formData.blood_type}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Allergies</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="List any allergies"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Chronic Conditions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="chronic_illness"
                  value={formData.chronic_illness}
                  onChange={handleChange}
                  placeholder="List chronic conditions"
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Current Medications</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="current_medications"
                  value={formData.current_medications}
                  onChange={handleChange}
                  placeholder="List current medications"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Family Medical History</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="family_medical_history"
                  value={formData.family_medical_history}
                  onChange={handleChange}
                  placeholder="Family medical history"
                />
              </Form.Group>
            </div>
          </div>

          <h6>Emergency Contact</h6>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Emergency Contact Name</Form.Label>
                <Form.Control
                  type="text"
                  name="emergency_contact_name"
                  value={formData.emergency_contact_name}
                  onChange={handleChange}
                  placeholder="Emergency contact name"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Emergency Contact Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="emergency_contact_phone"
                  value={formData.emergency_contact_phone}
                  onChange={handleChange}
                  placeholder="Emergency contact phone"
                />
              </Form.Group>
            </div>
          </div>

          <h6>Insurance Information</h6>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Insurance Type</Form.Label>
                <Form.Control
                  type="text"
                  name="insurance_type"
                  value={formData.insurance_type}
                  onChange={handleChange}
                  placeholder="Insurance type"
                />
              </Form.Group>
            </div>
          </div>
            <h6>Recent Activity</h6>
            <div className="row">
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Last Doctor Visited</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_doctor"
                            value={formData.last_doctor}
                            onChange={handleChange}
                            placeholder="Last doctor visited"
                        />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="mb-3">   
                        <Form.Label>Last Appointment Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="last_appointment"
                            value={formData.last_appointment}
                            onChange={handleChange}
                            placeholder="Last appointment date"
                        />
                    </Form.Group>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Patient'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PatientEditForm;