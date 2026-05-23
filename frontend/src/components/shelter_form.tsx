import { useState } from "react";
import { animalApi } from "../api/shelter";

export default function AnimalForm({ onResult }: any) {
  
  const [form, setForm] = useState({
    age_upon_outcome: "2 years",
    animal_type: "Dog",
    sex_upon_outcome: "Neutered Male",
    breed: "Labrador Retriever",
    color: "Black",
  });

  const options = {
    age_upon_outcome: [
      "1 week","2 weeks","1 month","2 months","3 months","6 months",
      "1 year","2 years","3 years","5 years","8 years","10 years"
    ],

    animal_type: ["Dog", "Cat", "Other"],

    sex_upon_outcome: [
      "Intact Male",
      "Intact Female",
      "Neutered Male",
      "Spayed Female",
      "Unknown"
    ],

    color: [
      "Black","White","Brown","Orange","Tan","Blue","Yellow","Cream"
    ],
  };

  const fields = [
    { key: "age_upon_outcome", label: "Edad", type: "select" },
    { key: "animal_type", label: "Tipo de animal", type: "select" },
    { key: "sex_upon_outcome", label: "Sexo / Estado", type: "select" },
    { key: "breed", label: "Raza", type: "text" },
    { key: "color", label: "Color", type: "select" },
  ];

  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const res = await animalApi.predict(form);
    onResult(res);
  };

  return (
    <div className="w-full">

      <h1 className="text-4xl font-bold text-center mb-6">
        🐾 ANIMAL OUTCOME PREDICTOR
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {fields.map((field) => (
          <div key={field.key} className="flex flex-col">

            <label className="text-sm font-medium mb-1">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                value={(form as any)[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
              >
                {options[field.key as keyof typeof options].map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={(form as any)[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
              />
            )}

          </div>
        ))}

      </div>

      <button
        onClick={handleSubmit}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
      >
        Predict Outcome
      </button>

    </div>
  );
}