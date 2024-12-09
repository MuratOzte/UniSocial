import { CssBaseline, Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion"; // Import motion from framer-motion
import CommunityBelongUni from "../communityKulupUni";
import CommunityOthers from "../communitiyOthers";
import { useDispatch, useSelector } from "react-redux";
import registerSlice from "@/store/Slices/RegisterSlice";

const Inputs2 = (props) => {
  const dispatch = useDispatch();
  const register = useSelector((state) => state.register);

  const stepChangeHandler = (page) => {
    dispatch(registerSlice.actions.stepChangeHandler(page));
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography
            component="h1"
            variant="h6"
            sx={{ userSelect: "none", minWidth: 350, textAlign: "center" }}
          >
            <div
            style={{marginTop:25}}
            >
              {register.communityType === "Kulüp"
                ? "Kulübün bağlı olduğu üniversiteyi girin"
                : "Şirketin faaliyet alanını girin"}
            </div>
          </Typography>
          <div style={{ marginTop: 30 }}>
            {register.communityType === "Kulüp" ? (
              <CommunityBelongUni />
            ) : (
              <CommunityOthers />
            )}
          </div>
        </motion.div>
        <Box
          sx={{
            my: 3,
            marginTop: 7,
            display: "flex",
            justifyContent: "space-between",
            gap: 2, // Butonlar arası boşluk
            width: "100%", // Tam genişlik
            maxWidth: 400, // Maksimum genişlik
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button
              variant="contained"
              onClick={() => {
                stepChangeHandler(1);
              }}
              fullWidth // Daha iyi hizalama için
            >
              Previous Step
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button
              variant="contained"
              onClick={() => {
                stepChangeHandler(3);
              }}
              disabled={!(register.communityUni || register.companyType)}
              fullWidth // Daha iyi hizalama için
            >
              Next Step
            </Button>
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default Inputs2;
