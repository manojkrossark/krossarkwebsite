<?php
echo "php runs";
header("Access-Control-Allow-Origin: *"); // You can replace * with specific domain for production like "https://yourdomain.com"
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow GET, POST, and OPTIONS methods
    header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization"); // Allow the necessary headers
    header("Access-Control-Allow-Credentials: true");

// Handling preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $recaptchaToken = $_POST['g-recaptcha-response'];
    $secretKey = "6LdoOQ0rAAAAANbvkD1jIEWjdc88rdaPavVbMO4w";

    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$recaptchaToken");
        $captchaSuccess = json_decode($verify);
    
        if (!$captchaSuccess->success) {
            // reCAPTCHA failed
            echo json_encode([
                "type" => "danger",
                "message" => "reCAPTCHA verification failed. Please try again."
            ]);
            exit;
        }

    // Collect form data
    $name = $_POST['name']; 
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Validate the data
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Prepare the email content
        $to = "info@krossark.com";  // Recipient's email address
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        // Email body
        $body = "<h2>Contact Form Submission</h2>";
        $body .= "<strong>Name:</strong> " . htmlspecialchars($name) . "<br>";
        $body .= "<strong>Email:</strong> " . htmlspecialchars($email) . "<br>";
        $body .= "<strong>Subject:</strong> " . htmlspecialchars($subject) . "<br>";
        $body .= "<strong>Message:</strong><br>" . nl2br(htmlspecialchars($message));

        // Send the email
        if (mail($to, $subject, $body, $headers)) {
            echo "Message sent successfully.";
        } else {
            echo "There was an error sending the message.";
        }
    } else {
        echo "All fields are required.";
    }
}
?>
