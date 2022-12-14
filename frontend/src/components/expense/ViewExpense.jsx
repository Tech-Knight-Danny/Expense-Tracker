import "../../css/expense.css";
import {Heading} from "../Heading/Heading";
import {Button, Card} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import {addNotification, isSuccessfulResponse, routes, showPopup} from "../../constants";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteExpense, viewExpense} from "../../redux/actions";
import {usePrevious} from "react-use";
import {Loading} from "../Loading";
import Swal from "sweetalert2";
import {useAuth} from "../../contexts/Auth";

function ViewExpense() {

    const history = useHistory();

    const {id} = useParams();

    const dispatch = useDispatch();

    const viewExpenseResponseData = useSelector(
        (state) => state.expense.viewExpenseResponseData
    );

    const isViewExpenseResponseReceived = useSelector(
        (state) => state.expense.isViewExpenseResponseReceived
    );

    const prevIsViewExpenseResponseReceived = usePrevious(isViewExpenseResponseReceived);

    const [currentExpense, setCurrentExpense] = useState({});

    useEffect(() => {
        dispatch(viewExpense(id));
    }, []);

    useEffect(() => {
        if (prevIsViewExpenseResponseReceived !== isViewExpenseResponseReceived && isSuccessfulResponse(viewExpenseResponseData)) {
            setCurrentExpense(viewExpenseResponseData['success'][0]);
        }
    }, [isViewExpenseResponseReceived]);

    const editExpense = (currentExpense) => {
        // history.push({pathname: routes.editExpense.path.split(":")[0] + currentExpense.id, currentExpense});
        history.push(routes.editExpense.path.split(":")[0] + currentExpense.id, currentExpense, currentExpense);
    };

    const isDeleteExpenseResponseReceived = useSelector(
        (state) => state.expense.isDeleteExpenseResponseReceived
    );

    const deleteExpenseResponseData = useSelector(
        (state) => state.expense.deleteExpenseResponseData
    );

    const prevIsDeleteExpenseResponseReceived = usePrevious(isDeleteExpenseResponseReceived);

    const user = useAuth();

    useEffect(() => {
        if (prevIsDeleteExpenseResponseReceived !== undefined && prevIsDeleteExpenseResponseReceived !== isDeleteExpenseResponseReceived) {
            if (isDeleteExpenseResponseReceived) {
                history.push(routes.expense.path);
                if (isSuccessfulResponse(deleteExpenseResponseData)) {
                    addNotification(4, deleteExpenseResponseData.success[0], user.user().user.id);
                    showPopup("success", "Success", "Expense Successfully Created");
                    history.push(routes.expense.path);
                }
            }
        }
    }, [isDeleteExpenseResponseReceived]);

    return (
        <div className="view-expense">
            <Heading>View Detailed Expense</Heading>
            <h2 className="mt-4 text-center">Expenses</h2>
            <div className="m-5">
                {!isViewExpenseResponseReceived ? <Loading/> :
                    <Card className="p-2 mb-3">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h4>{currentExpense.name}</h4>
                            </div>
                            <div>
                                <h4>Amount: {currentExpense.amount}</h4>
                            </div>
                        </div>
                        <div>
                            <h5>Users for expenses</h5>
                            <ul>
                                {currentExpense?.users?.map((user) => {
                                    let tempUser = user.id ? user.email_id : user
                                    return (
                                        <li key={tempUser}>{tempUser}</li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div>
                            {currentExpense?.groups?.length ?
                                <>
                                    <h5>Groups related to expenses</h5>
                                    <ul>
                                        {currentExpense?.groups?.map((group) => {
                                            return (
                                                <li key={group}>{group}</li>
                                            )
                                        })}
                                    </ul>
                                </>
                                : <div> No Group Related Expenses</div>}
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <Button className="mt-2"
                                    onClick={() => history.push(routes.settleExpense.path.split(":")[0] + currentExpense.id)}>
                                Settle Up
                            </Button>
                            <Button className="mt-2" onClick={() => editExpense(currentExpense)}>
                                Edit Expense
                            </Button>
                            <Button className="mt-2" onClick={() => Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!'
                            }).then((ele) => {
                                if (ele.isConfirmed) {
                                    dispatch(deleteExpense(currentExpense.id));
                                }
                            })}>
                                Delete Expense
                            </Button>
                        </div>
                    </Card>

                }
            </div>
        </div>
    )
}

export {ViewExpense}