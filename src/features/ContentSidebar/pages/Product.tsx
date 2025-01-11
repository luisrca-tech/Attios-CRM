import { Icon } from "~/common/components/ui/Icons/_index"
import { Creator } from "~/common/components/ui/images/mocks/Creators"
import type { products } from "~/server/db/schema"
import { ContentSidebar } from ".."
import BlueWaveGraphForeground from '/public/images/mocks/graphs/blueWaveGraph.png';
import WhiteWaveGraphBackground from '/public/images/mocks/graphs/whiteWaveGraph.png';
import Image from "next/image"
import { Button } from "~/common/components/ui/Button";

interface ProductWithContentSidebarProps {
  product: typeof products.$inferSelect & { category: { name: string } }
}

export const ProductWithContentSidebar = ({ product }: ProductWithContentSidebarProps) => {
  return (
    <ContentSidebar.Root hasHeader headerTitle={product.name} headerDescription={product.sku ?? ''}>
      <div className="flex flex-col gap-[1.875rem]">
       <div className="flex flex-col gap-2">
       <strong className="text-sm leading-4">Description</strong>
       <p className="teext-sm font-normal leading-5 text-primary-200">Color is so powerful that it can persuade, motivate, inspire and touch people's soft spot the heart. This is the reason why understanding colors is pretty crucial in relating.</p>
       </div>
       <div className="flex flex-col gap-3">
        <strong className="text-sm leading-4">Created</strong>
        <div className="flex items-center gap-1">
          <Creator creatorNumber={1}/>
          <Creator creatorNumber={2}/>
          <Creator creatorNumber={3}/>
        </div>
       </div>
       <div className="flex flex-col gap-5">
        <strong className="text-sm leading-4">Item details</strong>
           <div className="flex items-center gap-5">
           <Icon.Garage className="h-[1.125rem] w-[1.125rem]" />
           <span className="text-sm font-normal leading-5 text-black">{product.quantity} available</span>
           </div>
           <div className="flex items-center gap-5">
            <Icon.Shop className="h-[1.125rem] w-[1.125rem]" fill="#8181A5" />
            <span className="text-sm font-normal leading-5 text-black">1.328 sold</span>
           </div>
           <div className="flex items-center gap-5">
            <Icon.Wallet className="h-[1.125rem] w-[1.125rem]" />
            <span className="text-sm font-normal leading-5 text-black">${product.listPrice} current price</span>
           </div>
       </div>
       <div className="flex flex-col gap-3">
        <strong className="text-sm leading-4">Categories</strong>
        <div className="flex items-center gap-1">
          <div className="py-2 px-5 rounded-lg bg-white-200">
            <span className="text-sm font-bold leading-5 text-primary-200">{product.category.name}</span>
          </div>
        </div>
       </div>
       <div className="flex flex-col gap-3">
        <strong>Reviews</strong>
        <ContentSidebar.Card>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-normal leading-5 text-black">Good</span>
              <div className="flex items-center gap-1">
              <span className="text-sm font-bold leading-5 text-black">4.2</span>
              <span className="text-sm font-normal leading-5 text-black">/ 5</span>
              </div>
            </div>
            <div className="w-full h-1 rounded-full bg-white-400">
              <div className="w-[84%] h-full rounded-full bg-secondary-200" />
            </div>
          </div>
        </ContentSidebar.Card>
       </div>
       <ContentSidebar.Graph.Dinamyc className="relative mt-10 mb-6 min-h-[12rem] py-0 pt-[1.375rem]">
				<div className="flex items-center justify-between pb-7">
					<div className="flex flex-col">
						<strong className="text-base text-black leading-6">
							Conversion history
						</strong>
						<span className="font-normal text-primary-200 text-xs leading-5">
							Week to week performance
						</span>
					</div>
					<Button
						className="h-[2.625rem] w-[2.625rem] bg-primary-200/10 p-0 hover:bg-primary-200/50"
						color="secondary"
					>
						<Icon.Graph.Pizza className="h-[1.125rem] w-[1.125rem]" />
					</Button>
				</div>
				<div className="absolute right-0 bottom-0">
					<Image
						src={WhiteWaveGraphBackground}
						alt="White background wave graph"
						className="-top-4 absolute"
					/>
					<Image
						src={BlueWaveGraphForeground}
						alt="Blue foreground wave graph"
					/>
				</div>
			</ContentSidebar.Graph.Dinamyc>
      </div>
    </ContentSidebar.Root>
  )
}