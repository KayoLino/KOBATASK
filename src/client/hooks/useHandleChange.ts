export const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<string | undefined>>) => {
  setter(e.target.value);
};

export const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<string | undefined>>) => {
  setter(e.target.value);
};

export const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<string | undefined>>) => {
  setter(e.target.value);
};


export const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<Date | undefined>>) => {
  const value = e.target.value;

  if (!value) {
    setter(undefined);
    return;
  }

  const date = new Date(value);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  setter(date);
};
