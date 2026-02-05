import React, { useState, useEffect } from 'react';
import { Users as UserIcon, Loader2, Mail, Shield } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import { userService } from '../services/api';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await userService.getAll();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(search.toLowerCase()))
    );

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Users</h1>
                    <p className="text-slate-400 mt-1">Manage platform users</p>
                </div>
                <div className="w-full md:w-64">
                    <Input
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-slate-800"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <Card key={user.id} className="hover:border-primary/30 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">{user.username}</h3>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/20">Active</span>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} />
                                    <span>{user.email || 'No email provided'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield size={14} />
                                    <span>User ID: {user.id}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {filteredUsers.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        No users found matching "{search}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
