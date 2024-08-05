add_action('rest_api_init', function () {
       register_rest_route('custom/v1', '/validate-credentials', array(
           'methods' => 'POST',
           'callback' => 'validate_credentials',
           'permission_callback' => function () {
               return true; // 你可以根据需要设置权限
           },
       ));
   });

   function validate_credentials(WP_REST_Request $request) {
       $username = $request->get_param('username');
       $password = $request->get_param('password');

       if (empty($username) || empty($password)) {
           return new WP_Error('missing_fields', 'Username and password are required', array('status' => 400));
       }

       $user = wp_authenticate($username, $password);

       if (is_wp_error($user)) {
           return new WP_Error('invalid_credentials', 'Invalid username or password', array('status' => 401));
       }

       return rest_ensure_response(array('success' => true, 'message' => 'Credentials are valid'));
   }