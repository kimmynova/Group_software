import React, { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../alertmesengebox/alert';
import { Link, useParams } from 'react-router-dom';

const Employeephone = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState('');
    const [Employeephone, setEmployeesphone] = useState([])
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            fetch(`http://localhost/ugame_project/ugamerphp/Employee/EmployeePhneAndEmail.php/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data); // Log the API response
                    setTimeout(() => {
                        setEmployeesphone(data.employeephoneUpdate);
                        setIsLoading(false);
                    }, 1000);
                })
                .catch((err) => {
                    setError(err);
                    console.log(err);
                });
        }
    }, [id]);
    
    // Add this console.log to check Employeephone state
    console.log(Employeephone);
    

    return (
        <div className='absolute inset-0 z-[999] flex items-center justify-center'>
            <Link to={'/Employee'}>
                <div className='fixed top-0 left-0 w-screen h-screen bg-black opacity-80'></div>
            </Link>
            <div className='md:absolute border border-gray-500 dark:bg-[#06080F] w-[40%] bg-white h-[80vh] top-4 right-0 left-0 bottom-0 m-auto relative '>
                <table className='w-full border-y'>
                    <thead>
                        <tr className='dark:bg-[#3f4042] bg-slate-500 grid grid-cols-3 max-md:text-sm justify-center items-center'>
                            <th className='text-white pt-2'>ID</th>
                            <th className='text-white pt-2'>Phone</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {error ? (
                            <tr>
                                <td className='text-red-500'>Something went wrong!</td>
                            </tr>
                        ) : isLoading ? (
                            <tr>
                                <td className=' text-green-500'>Loading....</td>
                            </tr>
                        ) : (
                            Employeephone.map((employeephoneData, index) => (
                                <tr
                                    className='dark:bg-[#3f4042] lg:mx-w-full md:text-xl sm:text-sm grid grid-cols-3 justify-center items-center border'
                                    key={`employee-phone-${index}`}>
                                    <td className='flex pt-2 items-center justify-center'>{employeephoneData.id}</td>
                                    <td className='flex pt-2 items-center justify-center md:pr-5 sm:pr-5'>{employeephoneData.contact}</td>
                                    <td className='flex pt-2 items-center justify-center'>
                                        <div className='flex justify-center items-center gap-2 mr-8 '></div>
                                    </td>
                                    <td className='m-2 flex items-center justify-center'></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employeephone;
