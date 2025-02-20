import { COMMUNITY_POSTS } from '../data/mockData'
import { ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline'

export default function CommunityFeed() {
  return (
    <div className="space-y-4">
      {COMMUNITY_POSTS.map((post, index) => (
        <div 
          key={index} 
          className="bg-sharefolio-accent/50 backdrop-blur-sm rounded-lg p-4 border border-white/10"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-white/80">{post.user}</h4>
            <div className="flex items-center space-x-3 text-white/60">
              <div className="flex items-center space-x-1">
                <HeartIcon className="h-5 w-5" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ChatBubbleLeftIcon className="h-5 w-5" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
          <p className="text-white/90">{post.message}</p>
        </div>
      ))}
    </div>
  )
}
