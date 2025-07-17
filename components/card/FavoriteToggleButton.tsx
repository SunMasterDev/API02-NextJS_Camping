import { auth } from '@clerk/nextjs/server';
import { SignInCardButton } from '../form/Buttons';
import { fetchFavoriteId } from '@/actions/actions';
import FavoriteToggleForm from './FavoriteToggleForm';


const FavoriteToggleButton = async({ LandmarkId }: { LandmarkId: string }) => {
    const {userId} = await auth()
    // console.log(userId);

    if(!userId) return <SignInCardButton/> 
    // ถ้าไม่ได้ Login
    const favoriteId = await fetchFavoriteId({LandmarkId})

    return (
       <FavoriteToggleForm favoriteId={favoriteId} LandmarkId={LandmarkId}/>
    )
}
export default FavoriteToggleButton