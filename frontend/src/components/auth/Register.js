import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const steps = ["Personal Details", "Video Preferences", "Final Setup"];

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  "& .MuiTextField-root": {
    marginBottom: theme.spacing(2),
  },
}));

const Register = () => {
  const { register } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    videoPreferences: [],
    notifications: false,
    termsAccepted: false,
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = () => {
    setError("");
    switch (activeStep) {
      case 0:
        if (!formData.name || !formData.email || !formData.password) {
          setError("Please fill in all fields");
          return false;
        }
        if (formData.name !== "Ujjwal Singh") {
          setError("Please use the name: Ujjwal Singh");
          return false;
        }
        if (formData.email !== "sujjwal8521@gmail.com") {
          setError("Please use the email: sujjwal8521@gmail.com");
          return false;
        }
        if (formData.password !== "Mr.Ujjwal") {
          setError("Please use the password: Mr.Ujjwal");
          return false;
        }
        break;
      case 1:
        if (formData.videoPreferences.length === 0) {
          setError("Please select at least one video preference");
          return false;
        }
        break;
      case 2:
        if (!formData.termsAccepted) {
          setError("Please accept the terms and conditions");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        await register(formData);
      } catch (err) {
        setError(err.message || "Registration failed");
      }
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              helperText="Please use: Ujjwal Singh"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              helperText="Please use: sujjwal8521@gmail.com"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              helperText="Please use: Mr.Ujjwal"
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Video Preferences
            </Typography>
            <Grid container spacing={2}>
              {[
                "Educational",
                "Entertainment",
                "Sports",
                "Technology",
                "Music",
              ].map((pref) => (
                <Grid item xs={12} sm={6} key={pref}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.videoPreferences.includes(pref)}
                        onChange={(e) => {
                          const newPrefs = e.target.checked
                            ? [...formData.videoPreferences, pref]
                            : formData.videoPreferences.filter(
                                (p) => p !== pref
                              );
                          setFormData((prev) => ({
                            ...prev,
                            videoPreferences: newPrefs,
                          }));
                        }}
                      />
                    }
                    label={pref}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleInputChange}
                />
              }
              label="Receive notifications about new videos"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  required
                />
              }
              label="I accept the terms and conditions"
            />
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 4 }}>
          {activeStep === steps.length ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Registration Complete!
              </Typography>
              <Typography variant="subtitle1">
                You can now log in with your credentials.
              </Typography>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              {getStepContent(activeStep)}
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
              >
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Box>
                  {activeStep === steps.length - 1 ? (
                    <Button variant="contained" color="primary" type="submit">
                      Register
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </Box>
            </form>
          )}
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default Register;
