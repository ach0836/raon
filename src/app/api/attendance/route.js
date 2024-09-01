import Attendance from '@/models/attendance';
import dbConnect from '@/lib/dbConnect';

export async function GET(req) {
    await dbConnect();
    const attendances = await Attendance.find({});
    return new Response(JSON.stringify(attendances), { status: 200 });
}

export async function POST(req) {
    await dbConnect();
    const { studentId, date, status, remarks } = await req.json();
    const newAttendance = new Attendance({ studentId, date, status, remarks });
    await newAttendance.save();
    return new Response(JSON.stringify(newAttendance), { status: 201 });
}
