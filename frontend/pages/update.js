import UpdateItem from '../components/UpdateItem';

const UpdateDish = (props) => {
    return (
        <div>
            <UpdateItem id={props.query.id} />
        </div>
    )
}

export default UpdateDish;
