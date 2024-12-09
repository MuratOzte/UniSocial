import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import registerSlice from "@/store/Slices/RegisterSlice";
import AdvancedSelect from "../Advancedselect";

export default function CommunityBelongUni() {
  const dispatch = useDispatch();
  const register = useSelector((state) => state.register);
  const handleChange = (event) => {
    dispatch(
      registerSlice.actions.communityUniChangeHandler(event.target.value)
    );
  };
  console.log(register);

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Box sx={{ minWidth: 120, marginTop: 2 }}>
        <FormControl fullWidth>
          <AdvancedSelect
            options={['Karadeniz teknik üniversitesi','selçuk üniversitesi','istanbul teknik üniversitesi']}
            ondiffrance={handleChange}
            isdisabled={true}
            val={register.communityUni}
            labelName={'Univercity'}
          />

        </FormControl>
      </Box>
    </motion.div>
  );
}
