export type Role = 'User' | 'Admin'

export type Vacation = {
    vacationId: number
    destination: string
    description: string
    startDate: string
    endDate: string
    price: number
    imageName: string
    followersCount: number
    isFollowing: number
    image?: File
}
