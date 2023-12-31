import CartIconSvg from '@/app/catalog/Catalog-icons/CartIconSvg'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import cn from 'clsx'
import { FC } from 'react'
import styles from './ProductInfo.module.scss'

const ProductInfo: FC<{
	item: IBoilerPartsData
	mobile: boolean
	isInStock: number
	isInCart: boolean
	handleAddToCart: () => void
	handleRemoveToCart: () => void
}> = ({
	isInCart,
	isInStock,
	item,
	mobile,
	handleAddToCart,
	handleRemoveToCart
}) => {
	return (
		<div
			className={cn(styles.content, {
				[styles.content__content_mobile]: mobile
			})}
		>
			<div>{item.price} 'Р'</div>

			{!!isInStock ? (
				<div className={styles.content__stock}>Есть на складе</div>
			) : (
				<div className={styles.content__stock}>Нет на складе</div>
			)}
			<div>{item.vendorCode}</div>
			{!isInCart ? (
				<button className={styles.content__button} onClick={handleAddToCart}>
					<CartIconSvg /> Положить в корзину
				</button>
			) : (
				<button className={styles.content__button} onClick={handleRemoveToCart}>
					<CartIconSvg /> Удалить с корзины
				</button>
			)}
		</div>
	)
}
export default ProductInfo
