import Reset from '../components/Reset';

const ResetPage = (props) => {
    return (
        <div>
            <Reset resetToken={props.query.resetToken} />
        </div>
    )
}

export default ResetPage;
