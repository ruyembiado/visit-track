<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Visitor Report</title>
    <style>
        body {
            font-family: 'Instrument Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
                'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
            font-size: 12px;
        }

        h2 {
            text-align: center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #333;
            padding: 5px;
            text-align: left;
        }

        th {
            background-color: #f0f0f0;
        }

        tfoot td {
            font-weight: bold;
            background-color: #e0e0e0;
        }
    </style>
</head>

<body>
    <h2>Visitor Report - {{ $month }} {{ $year }}</h2>

    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Visitor Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>Visit Date & Time</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($visitors as $i => $visitor)
                <tr>
                    <td>{{ $i + 1 }}</td>
                    <td>{{ $visitor->name }}</td>
                    <td>{{ $visitor->phone }}</td>
                    <td>{{ $visitor->email }}</td>
                    <td>{{ $visitor->address }}</td>
                    <td>{{ $visitor->created_at->format('Y-m-d h:i A') }}</td>
                </tr>
            @endforeach
        </tbody>

        {{-- Total Visitors --}}
        <tfoot>
            <tr>
                <td colspan="6" style="text-align: right;">
                    Total Visitors: {{ $visitors->count() }}
                </td>
            </tr>
        </tfoot>
    </table>
</body>

</html>
