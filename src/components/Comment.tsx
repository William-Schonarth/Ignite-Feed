import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

interface CommentProps {
	content: string;
	onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
	const [likeCount, setLikeCount] = useState(0);

	function handleDeleteComment() {
		onDeleteComment(content);
	}

	function handleLikeComment() {
		setLikeCount(state => state + 1);
	}

	return (
		<div className={styles.comment}>
			<Avatar src="https://github.com/diego3g.png" hasBorder={false} />
			<div className={styles.commentBox}>
				<div className={styles.commentContent}>
					<header>
						<div className={styles.authorAndTime}>
							<strong>William Schonarth</strong>
							<time title="28 de março às 00:25h" dateTime="2023-03-18 00:25:11">
								Cerca de 1h atrás
							</time>
						</div>
						<button title="Deletar comentário">
							<Trash size={24} onClick={handleDeleteComment} />
						</button>
					</header>
					<p>{content}</p>
				</div>
				<footer>
					<button onClick={handleLikeComment}>
						<ThumbsUp />
						Aplaudir <span>{likeCount}</span>
					</button>
				</footer>
			</div>
		</div>
	);
}
