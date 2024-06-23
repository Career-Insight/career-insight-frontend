export const removeLastSavedData = (formData, step) => {
  const updatedFormData = { ...formData };
  const keys = step.split(".");

  let current = updatedFormData;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      return formData; // If the path doesn't exist, return the original formData
    }
    current = current[keys[i]];
  }

  delete current[keys[keys.length - 1]];
  return updatedFormData;
};
