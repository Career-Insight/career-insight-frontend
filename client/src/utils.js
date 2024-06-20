export const removeLastSavedData = (formData, step) => {
  const updatedFormData = { ...formData };
  delete updatedFormData[step];
  return updatedFormData;
};
