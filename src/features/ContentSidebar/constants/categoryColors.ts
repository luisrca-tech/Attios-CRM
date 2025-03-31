export enum CategoryColor {
  Electronics = "bg-primary-100/15 text-primary-100",
  Accessories = "bg-secondary-300/25",
  DigitalGoods = "bg-white-400",
}

export function getCategoryColor(categoryName: string): string {
  switch (categoryName) {
    case "Eletronics":
      return CategoryColor.Electronics;
    case "Accessories":
      return CategoryColor.Accessories;
    case "Digital goods":
      return CategoryColor.DigitalGoods;
    default:
      return "";
  }
}
