// Form-validation
// https://codepen.io/Kathiravan-Arjunan/pen/zYVNRJQ?editors=1010

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addEmployee");
  const allCheckbox = document.getElementById("flexCheckAll");
  const noneCheckbox = document.getElementById("flexCheckNone");
  const checkboxes = document.querySelectorAll(
    ".form-check-input:not(#flexCheckAll):not(#flexCheckNone)"
  );

  function handleAllCheckboxChange() {
    if (allCheckbox.checked) {
      checkboxes.forEach((checkbox) => (checkbox.checked = true));
      noneCheckbox.checked = false;
    } else {
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
    }
  }

  function handleNoneCheckboxChange() {
    if (noneCheckbox.checked) {
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
      allCheckbox.checked = false;
    }
  }

  function handleIndividualCheckboxChange() {
    const allChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked
    );
    const noneChecked = Array.from(checkboxes).every(
      (checkbox) => !checkbox.checked
    );

    if (allChecked) {
      allCheckbox.checked = true;
      noneCheckbox.checked = false;
    } else if (noneChecked) {
      noneCheckbox.checked = true;
      allCheckbox.checked = false;
    } else {
      allCheckbox.checked = false;
      noneCheckbox.checked = false;
    }
  }

  allCheckbox.addEventListener("change", handleAllCheckboxChange);
  noneCheckbox.addEventListener("change", handleNoneCheckboxChange);
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleIndividualCheckboxChange);
  });

  document
    .getElementById("addEmployee")
    .addEventListener("submit", function (event) {
      const fields = [
        {
          id: "firstName",
          errorId: "firstNameError",
          mandatory: true,
          message: "This field is required",
          min: 1,
          max: 65,
          lengthMessage: "First name must be between 1 and 65 characters.",
          pattern: /^[A-Za-z]+$/,
          patternMessage:
            "First name cannot contain numbers, spaces, or special characters.",
        },
        {
          id: "middleName",
          errorId: "middleNameError",
          mandatory: false,
          message: "This field is required",
          max: 65,
          lengthMessage: "Middle name must be up to 65 characters",
          pattern: /^[a-zA-Z]*$/,
          patternMessage:
            "Middle name cannot contain numbers, spaces, or special characters.",
        },
        {
          id: "lastName",
          errorId: "lastNameError",
          mandatory: true,
          message: "This field is required",
          min: 1,
          max: 65,
          lengthMessage: "Last name must be between 1 and 65 characters.",
          pattern: /^[A-Za-z]+$/,
          patternMessage:
            "Last name cannot contain numbers, spaces, or special characters.",
        },
        {
          id: "department",
          errorId: "departmentError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "passportNumber",
          errorId: "passportNumberError",
          mandatory: true,
          message: "This field is required",
          pattern: /^[A-Z]{1,2}\d{6,9}$/,
          patternMessage: "Invalid passport number.",
        },
        {
          id: "birthday",
          errorId: "birthdayError",
          mandatory: true,
          message: "This field is required",
          checkDate: true,
          dateMessage: "Future date cannot be selected.",
          minAge: 18,
          ageMessage: "Age should be above 18.",
        },
        {
          id: "dateOfJoining",
          errorId: "dateOfJoiningError",
          mandatory: true,
          message: "This field is required",
          checkDate: true,
          dateMessage: "Future date cannot be selected.",
        },
        {
          id: "indMedRep",
          errorId: "indMedRepError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "visaDoc",
          errorId: "visaDocError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "workPermit",
          errorId: "workPermitError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "onsiteVisaStatus",
          errorId: "onsiteVisaStatusError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "travelOnsite",
          errorId: "travelOnsiteError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "onsiteDOJ",
          errorId: "onsiteDOJError",
          mandatory: true,
          checkOnsiteDOJ: true,
          message: "This field is required",
          errorMessage: "Date Should come after Joining Date.",
        },
        {
          id: "medReport",
          errorId: "medReportError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "visaStamp",
          errorId: "visaStampError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "onsiteIdStatus",
          errorId: "onsiteIdStatusError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "hrComments",
          errorId: "hrCommentsError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "employeeStatus",
          errorId: "employeeStatusError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "passportStatus",
          errorId: "passportStatusError",
          mandatory: true,
          message: "This field is required",
        },
      ];

      let isValid = true;

      fields.forEach(
        ({
          id,
          errorId,
          mandatory,
          message,
          pattern,
          patternMessage,
          checkDate,
          checkOnsiteDOJ,
          minAge,
          dateMessage,
          ageMessage,
          min,
          max,
          lengthMessage,
          errorMessage,
        }) => {
          const currentField = document.getElementById(id);
          const inpValue = document.getElementById(id).value;
          const errorElement = document.getElementById(errorId);

          // Clear previous error
          errorElement.innerText = "";
          if (currentField.disabled === false) {
            if (mandatory) {
              if (inpValue === "") {
                errorElement.innerText = message;
                isValid = false;
                return;
              }

              // Length validate
              if (inpValue.length < min || inpValue.length > max) {
                errorElement.innerText = lengthMessage;
                isValid = false;
                return;
              }

              // Pattern validation
              if (pattern && !pattern.test(inpValue)) {
                errorElement.innerText = patternMessage;
                isValid = false;
                return;
              }

              // date and age validation
              if (checkDate) {
                const today = new Date();
                const birthDate = new Date(inpValue);
                if (birthDate > today) {
                  errorElement.innerText = dateMessage;
                  isValid = false;
                  return;
                } else {
                  let age = today.getFullYear() - birthDate.getFullYear();
                  const monthDiff = today.getMonth() - birthDate.getMonth();
                  if (
                    monthDiff < 0 ||
                    (monthDiff === 0 && today.getDate() < birthDate.getDate())
                  ) {
                    age--;
                  }
                  if (age < minAge) {
                    errorElement.innerText = ageMessage;
                    isValid = false;
                    return;
                  }
                }

                //onsie joiningdate validation
                if (checkOnsiteDOJ) {
                  const dateOfJoin = new Date(
                    document.getElementById("dateOfJoining").value
                  );
                  const onSiteDOJ = new Date(inpValue);
                  if (onSiteDOJ == dateOfJoin) {
                    errorElement.innerText = errorMessage;
                    isValid = false;
                    return;
                  }
                }
              }
            } else {
              // Length validate
              if (inpValue.length < min || inpValue.length > max) {
                errorElement.innerText = lengthMessage;
                isValid = false;
                return;
              }
              // Pattern validation
              if (pattern && !pattern.test(inpValue)) {
                errorElement.innerText = patternMessage;
                isValid = false;
                return;
              }
            }
          } else {
          }

          // Basic required field validation
          const checked = Array.from(checkboxes).some(
            (checkbox) => checkbox.checked
          );

          if (!checked && !allCheckbox.checked && !noneCheckbox.checked) {
            document.getElementById("checkboxError").textContent =
              "This field is mandatory.";
            isValid = false;
          } else {
            document.getElementById("checkboxError").textContent = "";
          }
        }
      );

      if (!isValid) {
        event.preventDefault();
      }
    });
  updateCheckboxes();
});

// input field disable onchange

document.addEventListener("DOMContentLoaded", () => {
  const fields = [
    "indMedRep",
    "visaDoc",
    "workPermit",
    "onsiteVisaStatus",
    "travelOnsite",
    "onsiteDOJ",
    "medReport",
    "visaStamp",
    "onsiteIdStatus",
    "employeeStatus",
    "passportStatus",
  ];

  function enableNextField(
    currentFieldId,
    nextFieldId,
    validValue,
    extraValue
  ) {
    const currentField = document.getElementById(currentFieldId);
    const nextField = document.getElementById(nextFieldId);

    currentField.addEventListener("change", () => {
      if (
        currentField.value === validValue ||
        currentField.value === extraValue
      ) {
        nextField.disabled = false;
      } else {
        nextField.disabled = true;
        disableFollowingFields(nextFieldId);
      }
    });
  }

  function disableFollowingFields(startFieldId) {
    const startIndex = fields.indexOf(startFieldId);
    for (let i = startIndex + 1; i < fields.length; i++) {
      document.getElementById(fields[i]).disabled = true;
    }
  }

  // Enable next field only if the current field has a specific valid value
  enableNextField("indMedRep", "visaDoc", "fit");
  enableNextField("visaDoc", "workPermit", "collected");
  enableNextField("workPermit", "onsiteVisaStatus", "received");
  enableNextField("onsiteVisaStatus", "travelOnsite", "received");
  enableNextField("travelOnsite", "onsiteDOJ", "booked");
  enableNextField("onsiteDOJ", "medReport", "2024-07-31");
  enableNextField("medReport", "visaStamp", "1st test fit", "2nd test fit");
  enableNextField("visaStamp", "onsiteIdStatus", "received");
  enableNextField("onsiteIdStatus", "employeeStatus", "id received");
  enableNextField("employeeStatus", "passportStatus", "active");
});
