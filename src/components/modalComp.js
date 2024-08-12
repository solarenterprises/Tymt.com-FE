import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import closeIcon from "../assets/icons/close-icon.svg";
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { OS } from "../utils/getEnv";
import axios from "axios";

const customStyles = {
  control: (provided) => ({
    ...provided,
    background: '#0D0D0D66',
    borderColor: 'rgba(255, 255, 255, 0.10)',
    boxShadow: 'none',
    '&:hover': {
      border: 'none'
    },
    '&:focus': {
      borderColor: '#86b7fe',
      outline: 0,
      boxShadow: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
    }
  }),
  menu: (provided) => ({
    ...provided,
    background: 'rgb(143 142 142 / 80%)',
    backdrop: 'blur(100px)',
    borderRadius: 16,
    border: 'none',
    overflow: 'hidden',
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    // background: state.isSelected ? '#282828' : state.isFocused ? '#282828' : '#111',
    margin: '5px 0px 5px 0px',
    borderRadius: 8,
    background: 'rgb(143 142 142 / 29%)',
    backdrop: 'blur(100px)',
    color: 'white',
    '&:hover': {
      background: '#555',
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#FFFFFF4D',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#999',
    '&:hover': {
      color: '#fff',
    }
  }),
  indicatorSeparator: () => ({
    // Removes the separator
    display: 'block'
  }),
  // You may also need to adjust other parts like indicatorsContainer, clearIndicator, etc.
};

const ModalComp = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [osBtn, setOsBtn] = useState("common-btn-win");
  const [msg, setMsg] = useState("");
  const [os] = useState(OS(window));
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadReCAPTCHAScript = () => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      document.body.appendChild(script);
    };
    loadReCAPTCHAScript();
  }, []);

  const handleClose = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateForm = (token) => {
    let formErrors = {};
    if (!name) {
      formErrors.name = t("error-required", { field: t("name") });
    }
    if (!email) {
      formErrors.email = t("error-required", { field: t("email") });
    } else if (!validateEmail(email)) {
      formErrors.email = t("invalid-email");
    }
    if (!subject) {
      formErrors.subject = t("error-required", { field: t("subject") });
    }
    if (!msg) {
      formErrors.message = t("error-required", { field: t("message") });
    }
    if (!token) {
      formErrors.recaptcha = 'reCAPTCHA is required';
  }
    return formErrors;
  }

  const removeError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleSubmit = async () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(process.env.REACT_APP_RECAPTCHA_SITE_KEY, { action: 'submit' }).then(async (token) => {
        const formErrors = validateForm(token);
        console.log(token, formErrors)

        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }

        if (name && email && subject && msg) {
          const data = {
            username: name,
            sender_email: email,
            recipient_email: process.env.REACT_APP_SUPPORT_EMAIL_TO,
            subject: subject,
            email_content: msg,
            recaptcha_token: token
          };
          try {
            const baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_TYMPT_DEV_URL : process.env.REACT_APP_TYMPT_PRO_URL
            const response = await axios.post(`${baseURL}/auth/send-email`, data);
            console.log('Email sent successfully:', response.data);
          } catch (error) {
            if (error.response) {
              // The request was made, the server responded with a status code outside the range of 2xx
              console.error('Error sending email:', error.response.data);
            } else if (error.request) {
              // The request was made but no response was received
              console.error('No response received:', error.request);
            } else {
              // Something happened in setting up the request that triggered an error
              console.error('Error:', error.message);
            }
          }
          setOpen(false);
        }
      });
    });
  }

  const options = [
    { value: t("installation-technical-issue"), label: t("installation-technical-issue") },
    { value: t("development-question"), label: t("development-question") },
    { value: t("collaboration-question"), label: t("collaboration-question") },
    { value: t("gerneral-inquiry"), label: t("gerneral-inquiry") }
  ]
  useEffect(() => {
    if (os === "Windows OS") {
      setOsBtn("common-btn-win");
    } else {
      setOsBtn("common-btn-linux");
    }
  }, [os]);

  return (
    <Modal show={open} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <div className="modal-container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="fs-24 white">{t("contact-us")}</div>
          <div style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}><img src={closeIcon} alt="close" /></div>
        </div>
        <Form.Control
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            removeError("name");
          }}
          placeholder={t("name")}
        />
        {errors.name && <span className="red fs-16">{errors.name}</span>}
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            removeError("email");
          }}
          placeholder={t("email")}
        />
        {errors.email && <span className="red fs-16">{errors.email}</span>}
        <Select
          defaultValue={subject}
          onChange={(e) => {
            setSubject(e.value);
            removeError("subject");
          }}
          styles={customStyles}
          options={options}
          placeholder={t("subject")}
          theme={(theme) => ({
            ...theme,
            borderRadius: 8,
            colors: {
              ...theme.colors,
              primary25: '#666', // Color for options hover
              primary: '#000', // Color for the control when it is open
            },
          })}
        />
        {errors.subject && <span className="red fs-16">{errors.subject}</span>}

        <Form.Control
          as="textarea"
          rows={3}
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
            removeError("message");
          }}
          placeholder={t("your-message")}
        />
        {errors.message && <span className="red fs-16">{errors.message}</span>}
        <div className={`${osBtn} download-btn header-btn red-btn fs-18 bold-semi white`} onClick={handleSubmit}>{t("submit")}</div>
      </div>
    </Modal>
  )
}

export default ModalComp;