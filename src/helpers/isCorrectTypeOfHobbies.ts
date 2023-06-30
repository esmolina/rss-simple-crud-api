export const isCorrectTypeOfHobbies = (hobbiesArray: Array<any>): boolean => {
  return hobbiesArray.every((hobby) => typeof hobby !== 'string');
};
