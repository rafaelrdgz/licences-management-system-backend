import passwordValidation from './passwordValidation';
import emailValidation from './emailValidation';
import pointsValidation from './pointsValidation';
import phoneValidation from './phoneValidation';
import personIdValidation from './personIdValidation';
import nameValidation from './nameValidation';
import licenseValidation from './licenseValidation';
import entityCodeValidation from './entityCodeValidation';
import addressValidation from './addressValidation';

const validateController = async (type, value) => {
  let validationFunction;

  switch (type) {
    case 'password':
      validationFunction = passwordValidation;
      break;
    case 'email':
      validationFunction = emailValidation;
      break;
    case 'points':
      validationFunction = pointsValidation;
      break;
    case 'phone':
      validationFunction = phoneValidation;
      break;
    case 'personId':
      validationFunction = personIdValidation;
      break;
    case 'name':
      validationFunction = nameValidation;
      break;
    case 'license':
      validationFunction = licenseValidation;
      break;
    case 'entityCode':
      validationFunction = entityCodeValidation;
      break;
    case 'address':
      validationFunction = addressValidation;
      break;
    default:
      console.error("Invalid validation type");
      return;
  }

  const result = await validationFunction(value);

  if (!result.valid) {
    const error = new Error("Validation failed: Invalid input");
    error.status = 401;
    throw error;
  }
}

export default validateController;
