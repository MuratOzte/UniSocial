import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { motion } from "framer-motion";

export default function AdvancedSelect({ options,ondiffrance,isdisabled,val,labelName}) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Box sx={{ minWidth: 120, marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{labelName}</InputLabel>
          <Select
            disabled={!isdisabled}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={val}
            label={labelName}
            onChange={ondiffrance}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </motion.div>
  );
}
