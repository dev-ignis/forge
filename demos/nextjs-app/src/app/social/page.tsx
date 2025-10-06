'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ForgeCard,
  ForgeButton,
  ForgeAvatar,
  ForgeInput,
  ForgeBadge,
  ForgeIcon,
  ForgeTextarea,
} from '@nexcraft/forge/integrations/react';

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

export default function SocialPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: 'Sarah Johnson',
        avatar: 'SJ',
        username: '@sarahj',
      },
      content:
        '🚀 Just launched our new design system with @nexcraft/forge! The component library is absolutely amazing. Check it out!',
      timestamp: '2 hours ago',
      likes: 24,
      isLiked: false,
      comments: [
        {
          id: 1,
          author: { name: 'Mike Davis', avatar: 'MD' },
          content: 'Looks incredible! Can\'t wait to try it out 🔥',
          timestamp: '1 hour ago',
        },
      ],
    },
    {
      id: 2,
      author: {
        name: 'Alex Chen',
        avatar: 'AC',
        username: '@alexc',
      },
      content:
        'Working on an exciting new project! The AI-native components from Forge are making development so much faster.',
      timestamp: '5 hours ago',
      likes: 18,
      isLiked: true,
      comments: [],
    },
    {
      id: 3,
      author: {
        name: 'Emma Wilson',
        avatar: 'EW',
        username: '@emmaw',
      },
      content:
        'Quick tip: Use Forge components with React Hook Form for the best form experience. The integration is seamless! 💡',
      timestamp: '1 day ago',
      likes: 42,
      isLiked: false,
      comments: [
        {
          id: 1,
          author: { name: 'John Smith', avatar: 'JS' },
          content: 'Thanks for the tip!',
          timestamp: '20 hours ago',
        },
        {
          id: 2,
          author: { name: 'Lisa Brown', avatar: 'LB' },
          content: 'This saved me so much time 🙌',
          timestamp: '18 hours ago',
        },
      ],
    },
  ]);

  const [newPost, setNewPost] = useState('');
  const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now(),
      author: {
        name: 'You',
        avatar: 'ME',
        username: '@you',
      },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
      comments: [],
    };

    setPosts((prev) => [post, ...prev]);
    setNewPost('');
  };

  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: {
        name: 'You',
        avatar: 'ME',
      },
      content: newComment,
      timestamp: 'Just now',
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );

    setNewComment('');
    setActiveCommentPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Social Feed</h1>
          <p className="text-gray-600 mt-1">Share your thoughts with the community</p>
        </motion.div>

        {/* Create Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <ForgeCard className="p-6">
            <div className="flex items-start gap-4">
              <ForgeAvatar initials="ME" size="md" />
              <div className="flex-1">
                <ForgeTextarea
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost((e as any).target.value)}
                  rows={3}
                  className="w-full mb-3"
                />
                <div className="flex justify-end">
                  <ForgeButton
                    variant="primary"
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                  >
                    Post
                  </ForgeButton>
                </div>
              </div>
            </div>
          </ForgeCard>
        </motion.div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ForgeCard className="p-6">
                {/* Post Header */}
                <div className="flex items-start gap-4 mb-4">
                  <ForgeAvatar initials={post.author.avatar} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        {post.author.name}
                      </span>
                      <span className="text-gray-500">{post.author.username}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-500 text-sm">{post.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-900 mb-4 whitespace-pre-wrap">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-4 border-t">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <ForgeIcon
                      name={post.isLiked ? 'heart-filled' : 'heart'}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>

                  <button
                    onClick={() => setActiveCommentPost(post.id)}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <ForgeIcon name="message-circle" className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.comments.length}</span>
                  </button>

                  <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                    <ForgeIcon name="share" className="w-5 h-5" />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>

                {/* Comments */}
                {post.comments.length > 0 && (
                  <div className="mt-4 pt-4 border-t space-y-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-3">
                        <ForgeAvatar initials={comment.author.avatar} size="sm" />
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">
                              {comment.author.name}
                            </span>
                            <span className="text-gray-500 text-xs">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-900">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment */}
                {activeCommentPost === post.id && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-start gap-3">
                      <ForgeAvatar initials="ME" size="sm" />
                      <div className="flex-1">
                        <ForgeInput
                          placeholder="Write a comment..."
                          value={newComment}
                          onChange={(value) => setNewComment(value as string)}
                          onKeyPress={(e: any) => {
                            if (e.key === 'Enter') {
                              handleAddComment(post.id);
                            }
                          }}
                          className="mb-2"
                        />
                        <div className="flex gap-2">
                          <ForgeButton
                            variant="primary"
                            size="sm"
                            onClick={() => handleAddComment(post.id)}
                            disabled={!newComment.trim()}
                          >
                            Comment
                          </ForgeButton>
                          <ForgeButton
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setActiveCommentPost(null);
                              setNewComment('');
                            }}
                          >
                            Cancel
                          </ForgeButton>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </ForgeCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
