import { format, formatDistanceToNowStrict } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface Author {
	name: string;
	role: string;
	avatarUrl: string;
}

interface Content {
	type: 'paragraph' | 'link';
	content: string;
}

export interface PostType {
	id: number;
	author: Author;
	publishedAt: Date;
	content: Content[];
}

interface PostProps {
	post: PostType;
}

export function Post({ post }: PostProps) {
	const [comments, setComments] = useState(['Nossa, que legal!!']);
	const [newCommentText, setNewCommentText] = useState('');

	const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
	const publishedDateRelativaToNow = formatDistanceToNowStrict(post.publishedAt, { locale: ptBR, addSuffix: true });

	const isNewCommentEmpty = newCommentText.length === 0;

	function handleCreateNewComent(event: FormEvent) {
		event.preventDefault();
		setComments([...comments, newCommentText]);
		setNewCommentText('');
	}

	function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity('');
		setNewCommentText(event.target.value);
	}

	function deleteComment(commentToDelete: string) {
		setComments(comments.filter(comment => comment !== commentToDelete));
	}

	function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity('Campo obrigatório');
	}

	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<Avatar src={post.author.avatarUrl} alt="" />
					<div className={styles.authorInfo}>
						<strong>{post.author.name}</strong>
						<span>{post.author.role}</span>
					</div>
				</div>
				<time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
					{'Publicado '.concat(publishedDateRelativaToNow)}
				</time>
			</header>

			<div className={styles.content}>
				{post.content.map(line => {
					if (line.type === 'paragraph') {
						return <p key={line.content}>{line.content}</p>;
					} else if (line.type === 'link') {
						return (
							<p key={line.content}>
								<a href="#">{line.content}</a>
							</p>
						);
					}
				})}
			</div>
			<form onSubmit={handleCreateNewComent} className={styles.commentForm}>
				<strong>Deixar seu feedback</strong>
				<textarea
					name="comment"
					placeholder="Deixe seu comentário"
					value={newCommentText}
					onChange={handleNewCommentChange}
					onInvalid={handleNewCommentInvalid}
					required
				/>
				<footer>
					<button type="submit" disabled={isNewCommentEmpty}>
						Publicar
					</button>
				</footer>
			</form>
			<div className={styles.commentList}>
				{comments.map(comment => {
					return <Comment key={comment} content={comment} onDeleteComment={deleteComment} />;
				})}
			</div>
		</article>
	);
}
