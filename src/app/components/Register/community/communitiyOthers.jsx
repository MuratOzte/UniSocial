import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import registerSlice from "@/store/Slices/RegisterSlice";
import AdvancedSelect from "../Advancedselect";

export default function CommunityOthers() {
  const dispatch = useDispatch();
  const register = useSelector((state) => state.register);
  const handleChange = (event) => {
    dispatch(
      registerSlice.actions.activityFieldChangeHandler(event.target.value)
    );
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Box sx={{ minWidth: 120, marginTop: 2 }}>
        <FormControl fullWidth>
          <AdvancedSelect
            options={[
              "Teknoloji ve yazılım",
              "Medya ve çevre",
              "Hukuk ve kamu hizmetleri",
            ]}
            ondiffrance={handleChange}
            isdisabled={true}
            val={register.activityField}
            labelName={"CompanyType"}
          />
        </FormControl>
      </Box>
    </motion.div>
  );
}
