import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput, Alert, Share, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import BottomTab from '../components/Navigation';
import { Heart, MessageCircle, Share2, Search, Plus } from 'lucide-react-native';

interface Post {
  id: string;
  user: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  isLiked: boolean;
  comments: number;
  timeAgo: string;
}

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      content: 'Just adopted this little angel from the local shelter! Meet Luna 🐶',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
      likes: 124,
      isLiked: false,
      comments: 18,
      timeAgo: '2 hours ago',
    },
    {
      id: '2',
      user: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      content: 'Looking for recommendations for a good dog trainer in the downtown area. Any suggestions?',
      likes: 45,
      isLiked: false,
      comments: 32,
      timeAgo: '5 hours ago',
    },
    {
      id: '3',
      user: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
      content: 'Tips for first-time pet owners! Here are 5 things I wish I knew before getting my cat...',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
      likes: 289,
      isLiked: false,
      comments: 56,
      timeAgo: '1 day ago',
    },
    {
      id: '4',
      user: 'David Bowie',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100',
      content: 'Any tips for training a parrot? Ziggy is a bit too loud in the mornings! 🦜',
      image: 'https://images.unsplash.com/photo-1522850949506-32f65ea53fc9?auto=format&fit=crop&q=80&w=400',
      likes: 18,
      isLiked: false,
      comments: 15,
      timeAgo: '12h ago'
    },
    {
      id: '5',
      user: 'Elena Gilbert',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      content: 'Rex finally learned "Roll Over"! So proud of my smart boy. 🐕🦴',
      image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=400',
      likes: 56,
      isLiked: false,
      comments: 12,
      timeAgo: '1 day ago'
    }
  ]);

  const handleLike = (postId: string) => {
    setPosts((prev: Post[]) => prev.map((post: Post) => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string) => {
    setActivePostId(postId);
    setCommentText('');
    setIsCommentModalVisible(true);
  };

  const submitComment = () => {
    if (!commentText.trim() || !activePostId) return;

    setPosts((prev: Post[]) => prev.map((post: Post) => {
      if (post.id === activePostId) {
        return {
          ...post,
          comments: post.comments + 1
        };
      }
      return post;
    }));
    
    setIsCommentModalVisible(false);
    setActivePostId(null);
    setCommentText('');
    Alert.alert('Success', 'Comment added successfully!');
  };

  const handleShare = async (post: Post) => {
    try {
      const result = await Share.share({
        message: `Check out this post from ${post.user} on PawCare: ${post.content}`,
      });
      if (result.action === Share.sharedAction) {
        // Shared successfully
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Community</Text>
          <Text style={styles.subtitle}>Connect with fellow pet lovers</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search posts, tips, advice..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Create Post Button */}
        <Link href="/create-post" asChild>
          <TouchableOpacity style={styles.createPostBtn}>
            <Plus size={20} color="#ffffff" />
            <Text style={styles.createPostText}>Create Post</Text>
          </TouchableOpacity>
        </Link>

        {/* Posts Feed */}
        <View style={styles.feed}>
          {posts.map((post) => (
            <View key={post.id.toString()} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={{ uri: post.avatar }} style={styles.avatar} />
                <View style={styles.postUserInfo}>
                  <Text style={styles.userName}>{post.user}</Text>
                  <Text style={styles.postTime}>{post.timeAgo}</Text>
                </View>
              </View>

              <Text style={styles.postContent}>{post.content}</Text>

              {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} />
              )}

              <View style={styles.postActions}>
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={() => handleLike(post.id)}
                >
                  <Heart 
                    size={20} 
                    color={post.isLiked ? "#ef4444" : "#64748b"} 
                    fill={post.isLiked ? "#ef4444" : "transparent"} 
                  />
                  <Text style={[
                    styles.actionCount,
                    post.isLiked && styles.activeActionText
                  ]}>{post.likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleComment(post.id)}
                >
                  <MessageCircle size={20} color="#3b82f6" />
                  <Text style={styles.actionCount}>{post.comments}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={() => handleShare(post)}
                >
                  <Share2 size={20} color="#64748b" />
                  <Text style={[styles.actionCount, styles.shareText]}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Comment Modal */}
      <Modal
        visible={isCommentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCommentModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Comment</Text>
              <TouchableOpacity onPress={() => setIsCommentModalVisible(false)}>
                <Text style={styles.closeBtn}>Cancel</Text>
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.modalInput}
              placeholder="What's on your mind?"
              multiline
              autoFocus
              value={commentText}
              onChangeText={setCommentText}
            />

            <TouchableOpacity 
              style={[
                styles.submitBtn,
                !commentText.trim() && styles.submitBtnDisabled
              ]} 
              onPress={submitComment}
              disabled={!commentText.trim()}
            >
              <Text style={styles.submitBtnText}>Post Comment</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  createPostBtn: {
    flexDirection: 'row',
    backgroundColor: '#48d877',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    shadowColor: '#48d877',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createPostText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  feed: {
    marginBottom: 20,
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postUserInfo: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  postTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  postContent: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  shareText: {
    color: '#64748b',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  closeBtn: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
  },
  modalInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#0f172a',
    textAlignVertical: 'top',
    minHeight: 120,
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: '#48d877',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#48d877',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnDisabled: {
    backgroundColor: '#e2e8f0',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeActionText: {
    color: '#ef4444',
  }
});

export default Community;
