"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation, UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser, registerPatient } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { FileUploader } from "../FileUploader";

export const RegisterForm = ({user}:{user: User}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      // @ts-ignore
      const patient = await registerPatient(patientData);

      if (patient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Bienvenido 👋</h1>
          <p className="text-dark-700">Contanos un poco sobre vos.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Información personal</h2>
          </div>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Nombre completo *"
            placeholder="Lionel Messi"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email *"
              placeholder="qatar2022@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Telefono *"
              placeholder="3865782639"
            />
          </div>

          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Fecha de Nacimiento *"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Genero *"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Direccion *"
              placeholder="Córdoba 67"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Ocupación"
              placeholder="Empleado"
            />
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Contacto de emergencia *"
              placeholder="Nombre completo"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Numero de emergencia *"
              placeholder="38144567"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Información medica</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Profesional de cabecera *"
            placeholder="Selecciona uno"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Proveedor de salud *"
              placeholder="OSPE"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Número de póliza *"
              placeholder="ABC123456789"
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Alergias (si las tiene)"
              placeholder="Mencione cual/es"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Toma medicación?"
              placeholder="Ibuprofeno 200mg, Levothyroxine 50mcg"
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS*/}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Enfermedad cronica (si posee)"
              placeholder="Emofilia, HIV, etc"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Informacion adicional"
              placeholder="Tengo problemas de movilidad, por problemas en la espalda"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identificación y verificación</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Tipo de identificación"
            placeholder="Seleccione un tipo"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Numero de identificación"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Copia escaneada del documento de identidad"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consentimiento y privacidad</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="Doy mi consentimiento para recibir tratamiento"
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="Doy mi consentimiento para que se almacene mi informacion sanitaria con fines de tratamiento."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="Acepto la política de privacidad."
          />
        </section>

        <SubmitButton isLoading={isLoading}>Enviar y continuar</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;