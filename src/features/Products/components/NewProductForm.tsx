import { Button } from "~/common/components/ui/Button";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Input } from "~/common/components/ui/Input";

export function NewProductForm() {
  return (
    <form>
      <div className="flex flex-col gap-[0.875rem] mt-[2.625rem]">
        <div className="flex items-center justify-center mb-[1.6875rem]">
        <Button className="p-9 flex items-center justify-center rounded-xl bg-primary-100/10">
          <Icon.Upload />
        </Button>
        </div>
        <div className="flex flex-col gap-[0.875rem]">
          <Input.Root fieldText="Product's name">
            <Input.Text className="px-0" placeholder="Start typing..." renderIconRight={() => <Icon.Sidebar.Products />} />
          </Input.Root>
          <div className="flex gap-[1.875rem] w-full">
            <Input.Root className="w-full" fieldText="Sku">
            <Input.Text className="px-0" placeholder="Start typing..." renderIconRight={() => <Icon.Sku />} />
            </Input.Root>
            <Input.Root className="w-full" fieldText="Available quantity">
            <Input.Text className="px-0" placeholder="Start typing..." renderIconRight={() => <Icon.Garage />} />
            </Input.Root>
          </div>
          <div className="flex gap-[1.875rem] w-full">
            <Input.Root className="w-full" fieldText="Price">
              <Input.Text className="px-0" placeholder="Start typing..." renderIconRight={() => <Icon.Wallet />} />
            </Input.Root>
            <Input.Root className="w-full" fieldText="Category">
             <Input.SelectInput text="Select category" options={['1', '2', '3']}  renderIcon={() => <Icon.Arrow.Down />}/>
            </Input.Root>
          </div>
        </div>
        <div className="flex justify-between mt-[1.6875rem]">
          <Button type="button" className="bg-white-200 text-primary-200 hover:bg-secondary-300">Cancel</Button>
          <Button type="submit">Add & Proceed</Button>
        </div>
      </div>
    </form>
  )
}