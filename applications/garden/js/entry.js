// This file contains javascript that is specific to the garden/entry controller.
jQuery(document).ready(function($) {
   
   // Set the ClientHour if there is an input looking for it.
   var d = new Date();
   $('input:hidden[name$=ClientHour]').val(d.getHours());
   
   // Check to see if the selected username is valid
   $('#Register input[name=User/Name], body.register input[name=User/Name]').blur(function() {
      var name = $(this).val();
      if (name != '') {
         var checkUrl = $('#Definitions #WebRoot').text() + '/index.php/garden/utility/usernameavailable/'+encodeURIComponent(name);
         $.ajax({
            type: "GET",
            url: checkUrl,
            dataType: 'text',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
               $.popup({}, $('#Definitions #TransportError').html().replace('%s', textStatus));
            },
            success: function(text) {
               if (text == 'TRUE')
                  $('#NameUnavailable').hide();
               else
                  $('#NameUnavailable').show();
            }
         });
      }
   });
   
   // Check to see if passwords match
   $('input[name=User/PasswordMatch]').blur(function() {
      if ($('#Register input[name=User/Password], body.register input[name=User/Password]').val() == $(this).val())
         $('#PasswordsDontMatch').hide();
      else
         $('#PasswordsDontMatch').show();
   });
});