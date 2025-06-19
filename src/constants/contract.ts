/* eslint-disable @typescript-eslint/no-explicit-any */
export const CONTRACT_ADDRESS = "0x4eA0A867d0A0806be2e2c370f8e0B0472efC0b84";
export const tokenAddress = "0x2dcfe33d4797415c9775c9e7a7a59d77708b3da1";

export const colorStyles = {
  control: (styles: any) => ({
    ...styles,
    marginTop: "8px",
    marginBottom: "16px",
    backgroundColor: "#292929",
    fontFamily: "GilmerMedium",
    borderRadius: "4px",
    width: "100%",
    outline: "none",
    border: "none",
    fontSize: "14px",
  }),
  option: (styles: any) => ({
    ...styles,
    backgroundColor: "#292929",
    color: "#FFF",
    outline: "none",
    border: "none",
  }),
  menuList: (styles: any) => ({
    ...styles,
    margin: "0",
    padding: "0",
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#757575",
  }),
  input: (styles: any) => ({
    ...styles,
    color: "#FFF",
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: "#FFF",
  }),
};
