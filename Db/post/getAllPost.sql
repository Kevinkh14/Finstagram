SELECT p.post_id, p.user_id, p.content, p.picture, p.likes, u.username 
from posts p
INNER JOIN users u 
on u.user_id = p.user_id
