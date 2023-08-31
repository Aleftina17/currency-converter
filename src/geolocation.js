import axios from "axios";

//получаем координаты пользователя из браузерного API
export const getUserCoordinates = () => {
  return new Promise((resolve, reject) => {
    //проверяем, поддерживает ли браузер api геолокации
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        //если получение координат прошло успешно
        (position) => {
          const { latitude, longitude } = position.coords;
          //вызываем резолв с объектом координат - промис разрешен и передаст данные ожидающим
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not available"));
    }
  });
};

//получаем страну на основе координат из промиса
export async function getCountryByCoordinates(latitude, longitude) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`;

  try {
    const response = await axios.get(apiUrl);
    const address = response.data.address;

    if (address && address.country) {
      return address.country;
    } else {
      //если страна не найдена, выбрасываем ошибку
      throw new Error("Country not found");
    }
  } catch (error) {
    //если возникла ошибка при выполнении запроса, передаем ее дальше
    throw error;
  }
}
