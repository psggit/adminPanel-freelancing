import Endpoints from "./endpoints";
import { config } from "./../../config";

function parseHttpError(httpErr) {
  if (httpErr.response) return httpErr.response.data;
}

const processResponse = (response) => {
  if (response.status >= 200 && response.status <= 207) return response.json();
  else throw response;
};

const getBaseUrl = () => {
  return config.API_SERVER;
};

const getUserEmail = () => {
  const USER_EMAIL = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).email
    : "";

  return USER_EMAIL;
};

// export function getCompanies() {
//   return service()
//     .post(Endpoints.getCompanyList())
//     .then((response) => {
//       return processResponse(response);
//     })
//     .catch((err) => {
//       throw parseHttpError(err);
//     });
// }

export function login(payload) {
  return fetch(`${getBaseUrl()}${Endpoints.loginUser()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function getCompanies(payload) {
  payload.email = getUserEmail();
  return fetch(`${getBaseUrl()}${Endpoints.getCompanyList()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function getGroupsets(payload) {
  payload.adminEmail = getUserEmail();
  return fetch(`${getBaseUrl()}${Endpoints.getGroupsets()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function getEmployees(payload) {
  payload.adminEmail = getUserEmail();
  return fetch(`${getBaseUrl()}${Endpoints.getEmployees()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function getManagers(payload) {
  payload.adminEmail = getUserEmail();
  return fetch(`${getBaseUrl()}${Endpoints.getManagers()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function sendSurvey(payload) {
  return fetch(`${getBaseUrl()}${Endpoints.sendSurvey()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}

export function addCompany(payload) {
  return fetch(`${getBaseUrl()}${Endpoints.addCompany()}`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      throw parseHttpError(err);
    });
}
