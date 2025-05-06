import { Document, Types } from 'mongoose'

/**
 * Common API response interface
 */
export interface ApiResponse<T> {
  success: boolean
  error?: string
  [key: string]: any
}

/**
 * Pagination metadata
 */
export interface PaginationData {
  page: number
  limit: number
  total: number
  pages: number
}

/**
 * User interface
 */
export interface User {
  _id: string
  email: string
  createdAt: Date
  updatedAt: Date
}

/**
 * User document interface for Mongoose
 */
export interface UserDocument extends Document {
  password: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Post interface
 */
export interface Post {
  _id: string
  title: string
  content: string
  author: User | string
  status: 'draft' | 'published' | 'archived'
  tags: string[]
  coverImage?: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Post document interface for Mongoose
 */
export interface PostDocument extends Document {
  title: string
  content: string
  author: Types.ObjectId | string
  status: string
  tags: string[]
  coverImage?: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Post creation payload
 */
export interface PostCreateData {
  title: string
  content: string
  author: string
  status: 'draft' | 'published' | 'archived'
  tags: string[]
  coverImage?: string
}

/**
 * Blog interface
 */
export interface Blog {
  _id: string
  title: string
  image: {
    thumbnail: string
    file: string
    fileId: string
  }
  shortDescription: string
  content: string
  date: Date
  published: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Blog document interface for Mongoose
 */
export interface BlogDocument extends Document {
  title: string
  image: {
    thumbnail: string
    file: string
    fileId: string
  }
  shortDescription: string
  content: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

/**
 * Blog creation/update payload
 */
export interface BlogCreateUpdateData {
  title: string
  image: {
    thumbnail: string
    file: string
    fileId: string
  }
  shortDescription: string
  content: string
  published: boolean
  date: Date
}

/**
 * User creation payload
 */
export interface UserCreateData {
  email: string
  password: string
}

/**
 * User update payload
 */
export interface UserUpdateData {
  email?: string
  password?: string
}

/**
 * Dashboard stats
 */
export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  archivedPosts: number
  recentPosts: Post[]
  recentUsers: User[]
}
