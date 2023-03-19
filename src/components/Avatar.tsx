import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
	hasBorder?: boolean;
}

export function Avatar({ src, alt, hasBorder = true, ...props }: AvatarProps) {
	return (
		<img
			className={hasBorder ? styles.avatarWithBorder : styles.avatar}
			src={src ?? 'https://github.com/William-Schonarth.png'}
			{...props}
		/>
	);
}
