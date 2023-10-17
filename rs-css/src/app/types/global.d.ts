declare module "*.module.css";
declare module "*.module.scss";

// images
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
  const content: string;
  export default content;
}
