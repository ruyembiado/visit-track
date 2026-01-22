<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->updateOrInsert(
            ['email' => 'admin@gmail.com'],
            [
                'name'       => 'Super Admin',
                'username'   => 'admin',
                'password'   => Hash::make('admin'),
                'role'       => 'superadmin',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
