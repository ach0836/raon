import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AttendancePage() {
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        async function fetchAttendance() {
            const response = await axios.get('/api/attendance');
            setAttendanceData(response.data);
        }
        fetchAttendance();
    }, []);

    return (
        <div>
            <h1>Attendance Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map((record) => (
                        <tr key={record._id}>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                            <td>{record.status}</td>
                            <td>{record.remarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
