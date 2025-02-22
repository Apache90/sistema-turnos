export const GenderOptions = ["hombre", "mujer", "otros"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "hombre" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "DNI",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "DNI",
  "Licencia de conducir",
  "Carnet de obra social",
  "ID Militar",
  "Pasaporte"
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Pablo Wyss",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Mariel Wyss",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Maricel Alavarez",
  }
];

export const StatusIcon = {
  programado: "/assets/icons/check.svg",
  pendiente: "/assets/icons/pending.svg",
  cancelado: "/assets/icons/cancelled.svg",
};