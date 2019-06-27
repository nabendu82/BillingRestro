import CreateItem from '../components/CreateItem';
import PleaseSignIn from '../components/PleaseSignin';

const AddDish = () => {
    return (
        <div>
            <PleaseSignIn>
                <CreateItem />
            </PleaseSignIn>
        </div>
    )
}

export default AddDish;
