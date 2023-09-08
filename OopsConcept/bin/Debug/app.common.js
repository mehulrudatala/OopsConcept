var ProbusUtility = {
    IsNullOrEmpty: function (data) {
        if ((data === undefined || data === null || data === "") && data !== false)
            return true;
        else
            return false;
    },
    IsUndefined: function (data) {
        try {
            return typeof data === 'undefined';
        }
        catch (err) {
            return true;
        }
    },
    IsNumeric: function (data) {
        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
        return RE.test(data);
    },
    ToInt: function (data, defaultValue) {
        try {
            if (data !== null && data !== "" && data !== undefined) {
                return parseInt(data);
            } else {
                return defaultValue;
            }
        }
        catch (err) {
            return defaultValue;
        }
    },
    ToDecimal: function (data, defaultValue) {
        try {
            if ((data !== null) && (data.toString().trim() !== '') && (data !== undefined)) {
                return parseFloat(data);
            } else {
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    },
    ToString: function (data, defaultValue) {
        try {
            if (data !== null && data !== "" && data !== undefined) {
                return data.toString();
            } else {
                return defaultValue;
            }
        }
        catch (err) {
            return defaultValue;
        }
    },
    ToBool: function (data, defaultValue) {
        try {
            if (data !== null && data !== "" && data !== undefined) {
                if (typeof data === "string") {
                    if (data.toUpperCase() === "TRUE")
                        return true;
                    else
                        return false;
                } else {
                    return data;
                }
            } else {
                return defaultValue;
            }
        }
        catch (err) {
            return defaultValue;
        }
    },
    DeserializeObject: function (jsonString) {
        return $.parseJSON(
            jsonString.replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/\t/g, "\\t")
                .replace(/\f/g, "\\f"));
    },
    ToJson: function (data, defaultValue) {
        try {
            if (data !== null && data !== "" && data !== undefined) {
                return $.parseJSON(data);
            } else {
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    },
    GetContentFromJSON: function (jsonData, keytoSearch) {
        try {
            var ValueToReturn;
            $.each(jsonData, function (index, jsonObject) {
                $.each(jsonObject, function (key, val) {
                    if (val === keytoSearch) {
                        ValueToReturn = jsonObject;
                        return false;
                    }
                });
            });

            return ValueToReturn;
        } catch (err) {
            alert(err.message);
        }
    },
    GetUniqueId: function () {
        return (Math.random() * 10007870545000 + Math.random() * 100009895465) * (Math.random() * Math.random());
    },
    ToShortDateString: function (data, format) {
        if (ProbusUtility.IsNullOrEmpty(data)) {
            data = new Date();
        }
        if (ProbusUtility.IsNullOrEmpty(format)) {
            format = UserConfiguration.DateFormat();
        }
        return moment(new Date(data)).format(format);
    },
    DateToDisplayString: function (jsonDate, DisplayName) {
        if (ProbusUtility.IsNullOrEmpty(DisplayName))
            return moment(jsonDate).format(UserConfiguration.DateFormat());
        else
            return moment.utc(jsonDate).tz(DisplayName).format(UserConfiguration.DateFormat());
    },
    DateToDisplayDateTimeString: function (jsonDate, DisplayName) {
        if (ProbusUtility.IsNullOrEmpty(DisplayName))
            return moment(jsonDate).format(UserConfiguration.DateTimeFormat());
        else
            return moment.utc(jsonDate).tz(DisplayName).format(UserConfiguration.DateTimeFormat());
    },
    CompareValues: function (key, order = 'asc') {
        return function (a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            var varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            var varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    },
    ToUpperCase: function (key) {
        return key.toUpperCase();
    },
    RemoveFromArray: function (__array, __attribute, __value) {
        var i = __array.length;
        while (i--) {
            if (__array[i]
                && __array[i].hasOwnProperty(__attribute)
                && (arguments.length > 2 && __array[i][__attribute] === __value)) {

                __array.splice(i, 1);
            }
        }
    }
};

var StaticConfig = {
    CurrencySymbol: '₹ ',
}

var UserConfiguration = {
    DateFormat: function () {
        return 'DD/MM/YYYY';
    },
    DateTimeFormat: function () {
        return 'DD/MM/YYYY hh:mm A';
    },
    DateTimeFormat24Hour: function () {
        return 'DD/MM/YYYY HH:mm';
    },
    SystemDateFormat: function () {
        return "YYYY-MM-DD";
    },
    SystemDateTimeFormat: function () {
        return "YYYY-MM-DD hh:mm";
    },
    TimeFormat: function () {
        return 'HH:mm';
    },
    SystemTimeFormat: function () {
        return 'hh:mm A';
    },
    DayOfWeekFullFormat: function () {
        return 'dddd';
    },
    DayOfWeekShortFormat: function () {
        return 'ddd';
    }
};

var ProbusFunction = {
    ShowMessage: function (objOptions) {
        _objOpt = {
            Type: !ProbusUtility.IsUndefined(objOptions.Type) ? objOptions.Type : 'info',
            Message: !ProbusUtility.IsUndefined(objOptions.Message) ? objOptions.Message : 'Successfull!'
        }

        swal(_objOpt.Message, {
            icon: _objOpt.Type,
            buttons: false,
            timer: 2000,
        });
    },
    WaitLoader: function (objOptions) {
        if (ProbusUtility.IsUndefined(objOptions)) {
            objOptions = { Start: false };
        }
        if (objOptions.Start) {
            $.blockUI({
                message: `<div id="waitloader">
                            <i class="fa fa-circle-o-notch fa-spin fa-4x text-white"></i>
                        </div>`,
                css: {
                    border: 'none',
                    backgroundColor: '#fff',
                },
                overlayCSS: {
                    opacity: 0.3,
                },
                fadeIn: 0,
                fadeOut: 0,
            });
        } else {
            $.unblockUI();
        }
    },
    DisplayErrorClear: function (errorId) {
        var $errorBlock;
        if (ProbusUtility.IsUndefined(errorId))
            $errorBlock = $("#frmErrorBlock");
        else
            $errorBlock = $("#" + errorId);
        $errorBlock.empty();
    },
    DisplayError: function (response, parrentId) {
        var sqlEr = 0;
        var ErrorKey = "";
        sqlEr = ProbusUtility.ToInt(response.getResponseHeader("sqlen"), 0);
        if (!ProbusUtility.IsNullOrEmpty(response.getResponseHeader("ErrorKey"))) {
            ErrorKey = response.getResponseHeader("ErrorKey");
        }

        var $errorBlock;
        if (ProbusUtility.IsUndefined(parrentId))
            $errorBlock = $("#frmErrorBlock");
        else
            $errorBlock = $("#" + parrentId);
        $errorBlock.empty();
        var errorMessage;
        if (response.status === 500 && sqlEr !== -2)
            errorMessage = "<div class='alert alert-danger background-danger'>";
        else
            errorMessage = "<div class='alert alert-warning background-warning'>";

        errorMessage = errorMessage + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><i class=\"icofont icofont-close-line-circled text-white\"></i></button>";
        if (response.status === 0) {
            errorMessage = errorMessage + "<strong>Internet Disconnected !</strong>";
        } else if (response.status === 401) {
            errorMessage = errorMessage + "<strong>Unauthorized, please try to refresh app. !</strong>";
        } else if (response.status === 503) {
            errorMessage = errorMessage + "<strong>Application is down, please try after some time. !</strong>";
        } else if (response.status === 500) {
            errorMessage = errorMessage + "<strong>Error !</strong>";
        }

        errorMessage = errorMessage + "<ol class='font-weight-bold'>";
        if (response.responseJSON !== undefined) {
            $.each(response.responseJSON,
                function (a, b) {
                    errorMessage = errorMessage + "<li>" + a + " : " + b + "</li>";
                });
        }
        else if (response.statusText !== undefined && response.status === 500) {
            errorMessage = errorMessage + "<li>" + response.statusText + "</li>";
        }
        else if (!ProbusUtility.IsNullOrEmpty(response.responseText)) {
            errorMessage = errorMessage + "<li>" + response.responseText + "</li>";
        }
        try {
            if (sqlEr === -2) {
                errorMessage = errorMessage + "<li>Server taking more time to complete operation please try again and if its continuous than contact support team with all ticket id : " + ErrorKey + "</li>";
            } else {
                if (!ProbusUtility.IsNullOrEmpty(ErrorKey)) {
                    errorMessage = errorMessage + "<li>There is some issue in operation, please contact support team with below ticket id : " + ErrorKey + "</li>";
                }
            }
        } catch (e) {
            errorMessage = errorMessage + "";
        }

        errorMessage = errorMessage + "</ol>";
        errorMessage = errorMessage + "</div>";
        $errorBlock.append(errorMessage);
        $("html,body").animate({
            scrollTop: $errorBlock.offset().top - 100
        }, 500);
    },
    FileUpload: function (objOptions) {
        var _config = {
            mainClass: '',
            frameClass: '',
            browseLabel: '',
            browseIcon: '<i class="fa fa-folder-open"></i>',
            browseClass: 'btn btn-primary',
            removeLabel: '',
            removeIcon: '<i class="fa fa-refresh"></i>',
            removeClass: 'btn btn-light',
            previewFileIconClass: '<i class="fa fa-file"></i>',

            msgInvalidFileType: 'Only "{types}" files are supported.',
            msgInvalidFileExtension: 'Only "{extensions}" files are supported.',
            msgFileRequired: 'You must select a file to upload.',
            msgSizeTooSmall: '{files} must be larger than <b>{minSize} KB</b>.',
            msgSizeTooLarge: '{files} must be smaller than <b>{maxSize} KB</b>.',
            msgFilesTooLess: 'You must select at least <b>{n}</b> {files} to upload.',
            msgFilesTooMany: '<b>{n}</b> files selected, exceeds maximum allowed limit of <b>{m}</b>.'
        };

        _config['browseLabel'] = ProbusUtility.ToString(objOptions.BrowseLabel, '');
        _config['msgPlaceholder'] = ProbusUtility.ToString(objOptions.Placeholder, 'Select {files}...');
        _config['showPreview'] = false;
        _config['showUpload'] = false;

        if (!ProbusUtility.IsUndefined(objOptions.IsRequired))
            _config['required'] = objOptions.IsRequired;

        if (!ProbusUtility.IsUndefined(objOptions.FileTypes))
            _config['allowedFileTypes'] = objOptions.FileTypes;

        if (!ProbusUtility.IsUndefined(objOptions.Extensions))
            _config['allowedFileExtensions'] = objOptions.Extensions;

        if (!ProbusUtility.IsUndefined(objOptions.MinSize))
            _config['minFileSize'] = objOptions.MinSize;

        if (!ProbusUtility.IsUndefined(objOptions.MaxSize))
            _config['maxFileSize'] = objOptions.MaxSize;

        if (!ProbusUtility.IsUndefined(objOptions.MinCount))
            _config['minFileCount'] = objOptions.MinCount;

        if (!ProbusUtility.IsUndefined(objOptions.MaxCount))
            _config['maxFileCount'] = objOptions.MaxCount;

        var fileInputId = objOptions.FileInput;
        var objectFile;
        if ($("#" + fileInputId).length === 1)
            objectFile = $("#" + fileInputId);
        else if ($("." + fileInputId).length !== 0)
            objectFile = $("." + fileInputId);
        else if (document.getElementsByClassName(fileInputId).length !== 0)
            objectFile = document.getElementsByClassName(fileInputId);
        else {
            throw Error("File upload or target object not found.");
        }
        objectFile.each(function () {
            var _this = $(this);
            if (_this.data('fileinput') === undefined) {
                _this.fileinput(_config)
                    .on("change", function (e) {
                        if (objOptions.OnChangeCallback !== undefined && typeof (objOptions.OnChangeCallback) === "function") {
                            objOptions.OnChangeCallback(e);
                        }
                    }).on("fileselect", function (e) {
                        if (objOptions.OnFileSelectCallback !== undefined && typeof (objOptions.OnFileSelectCallback) === "function") {
                            objOptions.OnFileSelectCallback(e);
                        }
                    }).on("fileselectnone", function (e) {
                        if (objOptions.OnSelectNoneCallback !== undefined && typeof (objOptions.OnSelectNoneCallback) === "function") {
                            objOptions.OnSelectNoneCallback(e);
                        }
                    }).on("fileclear", function (e) {
                        var _objId = e.currentTarget.name;
                        $('span[data-valmsg-for="' + _objId + '"]').text(''); // Used for the clear validation
                        if (objOptions.OnFileClearCallback !== undefined && typeof (objOptions.OnFileClearCallback) === "function") {
                            objOptions.OnFileClearCallback(e);
                        }
                    }).on("fileerror", function (e, data, msg) {
                        var _objId = e.currentTarget.name;
                        $('span[data-valmsg-for="' + _objId + '"]').html(msg);
                    });
            }
        });
    },
    FileUploadMethods: function (objOptions) {
        // Type: enable => Enable file upload control
        // Type: disable => Disable file upload control
        // Type: clear => Clear file upload control
        // Type: destroy => Destroy file upload control

        var fileInputId = objOptions.FileInput;
        var actionType = objOptions.Type;
        var objectFile;
        if ($("#" + fileInputId).length === 1)
            objectFile = $("#" + fileInputId);
        else if ($("." + fileInputId).length !== 0)
            objectFile = $("." + fileInputId);
        else if (document.getElementsByClassName(fileInputId).length !== 0)
            objectFile = document.getElementsByClassName(fileInputId);
        objectFile.each(function () {
            if ($(this).data('fileinput') !== undefined) {
                if (actionType.toLowerCase() === 'enable')
                    $(this).fileinput('enable');
                else if (actionType.toLowerCase() === 'disable')
                    $(this).fileinput('disable');
                else if (actionType.toLowerCase() === 'clear')
                    $(this).fileinput('clear');
                else if (actionType.toLowerCase() === 'destroy')
                    $(this).fileinput('destroy');
            }
        });
    },
    TagsInput: function (objOptions) {
        var _config = {
            tagClass: 'badge badge-primary big',
            trimValue: true,
            itemValue: "id",
            itemText: "text"
        };
        if (!ProbusUtility.IsUndefined(objOptions.ItemValue)) {
            _config['itemValue'] = objOptions.ItemValue;
        }

        if (!ProbusUtility.IsUndefined(objOptions.ItemText)) {
            _config['itemText'] = objOptions.ItemText;
        }

        if (!ProbusUtility.IsUndefined(objOptions.DataSource)) {
            var sourceData = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace(objOptions.ItemText),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: objOptions.DataSource
            });
            sourceData.initialize();
            _config['typeaheadjs'] = {
                name: 'sourceData',
                displayKey: objOptions.ItemText,
                source: sourceData.ttAdapter()
            };
            ProbusFunction.TagsInputApply(objOptions, _config, objOptions.DataSource);
        }
        else if (!ProbusUtility.IsUndefined(objOptions.DataUrl)) {
            var postData = {
                __RequestVerificationToken: objOptions.Token
            };

            if (objOptions.ParaArrayDetail !== undefined && objOptions.ParaArrayDetail !== null) {
                $.each(objOptions.ParaArrayDetail, function (__in, __obj) {
                    postData[__obj.ParaName] = __obj.ParaValue;
                });
            }

            $.ajax({
                url: objOptions.DataUrl,
                type: 'POST',
                data: postData,
                beforeSend: ProbusFunction.WaitLoader({ Start: true }),
                async: true,
                success: function (result) {
                    var sourceData = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.obj.whitespace(objOptions.ItemText),
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        local: result
                    });
                    sourceData.initialize();
                    _config['typeaheadjs'] = {
                        name: 'sourceData',
                        displayKey: objOptions.ItemText,
                        source: sourceData.ttAdapter()
                    };
                    ProbusFunction.TagsInputApply(objOptions, _config, result);
                    ProbusFunction.WaitLoader({ Start: false });
                },
                error: function (response) {
                    ProbusFunction.DisplayError(response);
                    ProbusFunction.WaitLoader({ Start: false });
                }
            });
        }
        else {
            ProbusFunction.TagsInputApply(objOptions, _config);
        }
    },
    TagsInputApply: function (objOptions, _config, result) {
        var InputId = objOptions.TagsInput;
        var objectInput;
        if ($("#" + InputId).length === 1)
            objectInput = $("#" + InputId);
        else if ($("." + InputId).length !== 0)
            objectInput = $("." + InputId);
        else if (document.getElementsByClassName(InputId).length !== 0)
            objectInput = document.getElementsByClassName(InputId);
        else {
            throw Error("Tags Input or target object not found.");
        }
        objectInput.each(function () {
            var _this = $(this);
            if (_this.data('fileinput') === undefined) {
                _this.tagsinput(_config);
                if (!ProbusUtility.IsUndefined(objOptions.Value)) {
                    var selectedData = objOptions.Value.split(",");
                    if (!ProbusUtility.IsUndefined(result)) {
                        $.map(selectedData, (function (_res, _in) {
                            _objTemp = result.find(x => x[_config.itemValue] == _res);
                            _this.tagsinput('add', _objTemp);
                        }));
                    }
                    else {
                        $.map(selectedData, (function (_res, _in) {
                            _objTemp = {};
                            _objTemp[_config.itemValue] = _res;
                            _objTemp[_config.itemText] = _res;
                            _this.tagsinput('add', _objTemp);
                        }));
                    }
                }
            }
        });
        $('.bootstrap-tagsinput input').on('keypress', function (e) {
            if (e.keyCode == 13) {
                e.keyCode = 188;
                e.preventDefault();
            };
        });
    },
    LangInput: function (objOptions) {
        var _config = {
            lan: 'gujarati',
        };
        if (!ProbusUtility.IsUndefined(objOptions.LangInput))
            _config['required'] = objOptions.LangInput;

        var InputId = objOptions.LangInput;
        var objectInput;
        if ($("#" + InputId).length === 1)
            objectInput = $("#" + InputId);
        else if ($("." + InputId).length !== 0)
            objectInput = $("." + InputId);
        else if (document.getElementsByClassName(InputId).length !== 0)
            objectInput = document.getElementsByClassName(InputId);
        else {
            throw Error("Language Input or target object not found.");
        }
        objectInput.each(function () {
            var _this = $(this);
            pramukhIME.addLanguage(PramukhIndic, _config.lan);
            pramukhIME.enable(_this.attr("id"));
        });
    },
    ProbusSelect: function (objOptions) {
        var postData = {
            __RequestVerificationToken: objOptions.Token
        };

        if (objOptions.ParaArrayDetail !== null) {
            $.each(objOptions.ParaArrayDetail, function (__in, __obj) {
                postData[__obj.ParaName] = __obj.ParaValue;
            });
        }

        $.ajax({
            url: objOptions.ListURL,
            type: 'POST',
            data: postData,
            beforeSend: ProbusFunction.WaitLoader({ Start: true }),
            async: true,
            success: function (result) {
                ProbusFunction.ProbusSelectLocal(objOptions, result);
                ProbusFunction.WaitLoader({ Start: false });
            },
            error: function (response) {
                ProbusFunction.DisplayError(response);
                ProbusFunction.WaitLoader({ Start: false });
            }
        });
    },
    ProbusSelectLocal: function (objOptions, result) {
        var selectId = objOptions.SelectId;
        var value = objOptions.Value;
        var allowClear = !ProbusUtility.IsUndefined(objOptions.AllowClear) ? objOptions.AllowClear : false;
        var allowTags = !ProbusUtility.IsUndefined(objOptions.AllowTags) ? objOptions.AllowTags : false;

        var placeholder = "--SELECT--";
        var objectSelect;
        if ($("#" + selectId).length === 1)
            objectSelect = $("#" + selectId);
        else if ($("." + selectId).length !== 0)
            objectSelect = $("." + selectId);
        else if (document.getElementsByClassName(selectId).length !== 0)
            objectSelect = document.getElementsByClassName(selectId);
        else {
            if (ProbusUtility.IsNullOrEmpty(objOptions.AllowIfObjectNotFound)) {
                throw Error("Drop-down or target object not found");
            } else {
                return true;
            }
        }

        objectSelect.each(function () {
            $dropdown = $(this);
            $dropdown.empty();
            $dropdown.append($("<option />").val("").text(placeholder));
            $.map(result, function (item) {
                $dropdown.append($("<option />").val(item.ValueKey).text(item.DisplayName));
            });

            $dropdown.select2({
                placeholder: placeholder,
                allowClear: allowClear,
                tags: allowTags,
                width: '100%',
                escapeMarkup: function (m) {
                    return m;
                }
            }).on("change", function (e) {
                if (objOptions.OnChangeCallback !== undefined && typeof (objOptions.OnChangeCallback) === "function") {
                    objOptions.OnChangeCallback(e);
                    //$('#' + e.currentTarget.id).valid();
                }
            }).on("select2:opening", function (e) {
                if (objOptions.OnOpeningCallback !== undefined && typeof (objOptions.OnOpeningCallback) === "function") {
                    objOptions.OnOpeningCallback(e);
                }
            }).on("select2:close", function (e) {
                $('#' + e.currentTarget.id).valid();
            }).on("select2:unselecting", function (e) {
                if (objOptions.OnUnselectingCallback !== undefined && typeof (objOptions.OnUnselectingCallback) === "function") {
                    objOptions.OnUnselectingCallback(e);
                }
            }).on("select2:selecting", function (e) {
                if (objOptions.OnSelectingCallback !== undefined && typeof (objOptions.OnSelectingCallback) === "function") {
                    objOptions.OnSelectingCallback(e);
                }
            });

            if (!ProbusUtility.IsNullOrEmpty(value)) {
                $dropdown.val(value).trigger("change");
            }
        });
    },
    ProbusTable: function (objOptions) {
        var postData = {
            __RequestVerificationToken: objOptions.Token,
            PageSize: objOptions.PageSize,
            StartIndex: objOptions.StartIndex
        };

        if (objOptions.ParaArrayDetail !== null) {
            $.each(objOptions.ParaArrayDetail, function (__in, __obj) {
                postData[__obj.ParaName] = __obj.ParaValue;
            });
        }
        if (ProbusUtility.ToBool(objOptions.AvoidIfDuplicate, false)) {
            var oldRequest = $("#" + objOptions.DataTable).attr("old-pull-request");
            if (ProbusUtility.ToString(oldRequest) === JSON.stringify(postData))
                return false;
            $("#" + objOptions.DataTable).attr("old-pull-request", JSON.stringify(postData));
        }

        $.ajax({
            url: objOptions.ListURL,
            type: 'POST',
            data: postData,
            beforeSend: ProbusFunction.WaitLoader({ Start: true }),
            async: true,
            success: function (result) {
                ProbusFunction.GenrateDataGrid(objOptions, result);
                ProbusFunction.WaitLoader({ Start: false });
            },
            error: function (response) {
                ProbusFunction.DisplayError(response);
                ProbusFunction.WaitLoader({ Start: false });
            }
        });
    },
    ProbusTableLocal: function (objOptions) {
        $.fn.dataTable.moment(UserConfiguration.DateTimeFormat());
        var myTable = $("#" + objOptions.DataTable);
        myTable.addClass("table-striped");
        try {
            $("#" + objOptions.DataTable).DataTable().destroy();
        } catch (e) {
        }
        var table = $("#" + objOptions.DataTable).DataTable({
            "paging": ProbusUtility.IsNullOrEmpty(objOptions.Paging) ? true : objOptions.Paging,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": true,
            "pageLength": ProbusUtility.IsNullOrEmpty(objOptions.PageLength) ? true : objOptions.PageLength,
            "stateSave": ProbusUtility.IsNullOrEmpty(objOptions.StateSave) ? true : objOptions.StateSave,
            "drawCallback": function (settings) {
                ProbusUtility.ResetHeight();
            }
        });
        window["dtin_" + objOptions.DataTable] = table;
        return table;
    },
    GenrateDataGrid: function (objOptions, result) {
        var myTable = $("#" + objOptions.DataTable);
        myTable.empty();
        myTable.addClass("table-striped");
        //adding header
        var thead = myTable.find("thead");
        var tBody = myTable.find("tbody");
        //if (thead.length === 0) {  //if there is no thead element, add one.
        thead = jQuery("<thead></thead>").appendTo(myTable);
        tBody = jQuery("<tbody></tbody>").appendTo(myTable);
        //}
        var tcont = 0;
        $.each(objOptions.colModel, function (i, item) {
            if (tcont === 0)
                thead.append('<tr></tr>');
            tcont = tcont + 1;
            if (item.visible === true) {
                var halign = "";
                switch (item.Halign) {
                    case "1":
                        halign = "text-align:left;";
                        break;
                    case "2":
                        halign = "text-align:center;";
                        break;
                    case "3":
                        halign = "text-align:right;";
                        break;
                    default:
                        halign = "text-align:left;";
                }
                colStyle = halign;
                if (!ProbusUtility.IsNullOrEmpty(item.width)) {
                    if (item.width == 0) {
                        colStyle += ";width: auto;";
                    }
                    else {
                        colStyle += ";width:" + item.width + "px;";
                    }
                }
                thead.find('tr:first').append('<th style="' + colStyle + '">' + item.name + '</th>');
            }
        });

        if (!ProbusUtility.IsUndefined(objOptions.ActionMenu) && !ProbusUtility.IsUndefined(objOptions.ActPer)) {
            if (objOptions.ActPer.length > 0) {
                thead.find('tr:first').append('<th> Action </th>');
            }
        }

        $.each(result.Records, function (i, data) {
            var unqid = Math.random().toString(16).slice(2);
            var newRowTr = $('<tr dt-row-id="' + unqid + '" />');
            $.each(objOptions.colModel, function (i, item) {
                if (item.visible === true) {
                    var halign = "";
                    switch (item.Halign) {
                        case "1":
                            halign = ";text-align:left;";
                            break;
                        case "2":
                            halign = ";text-align:center;";
                            break;
                        case "3":
                            halign = ";text-align:right;";
                            break;
                        default:
                            halign = ";text-align:left;";
                    }
                    var colStyle = item.ColumnStyle + halign;
                    if (!ProbusUtility.IsNullOrEmpty(item.Backcolor)) {
                        colStyle += ";background-color:" + item.Backcolor;
                    }
                    if (!ProbusUtility.IsNullOrEmpty(item.Forecolor)) {
                        colStyle += ";color:" + item.Forecolor;
                    }

                    if (ProbusUtility.IsNullOrEmpty(item.DataType)) {
                        switch (typeof data[item.index]) {
                            case "number":
                                item.DataType = "NUMBER";
                                break;
                            case "boolean":
                                item.DataType = "BOOLEAN";
                                break;
                            default:
                                item.DataType = "";
                        }
                    }

                    var displayName = "";
                    switch (item.DataType.toUpperCase()) {
                        case "DATE":
                            displayName = "";
                            if (!ProbusUtility.IsNullOrEmpty(item.TimeZoneValueFromRow) && ProbusUtility.IsNullOrEmpty(displayName)) { displayName = data[item.TimeZoneValueFromRow]; }
                            if (!ProbusUtility.IsNullOrEmpty(item.TimeZoneValue) && ProbusUtility.IsNullOrEmpty(displayName)) { displayName = TimeZoneValue; }
                            if (ProbusUtility.IsNullOrEmpty(displayName)) { displayName = ProbusUtility.ToString(data["DisplayName"], ""); }
                            newRowTr.append('<td style="' + colStyle + '">' + ConvertJsonDateString(data[item.index], displayName) + '</td>');
                            break;
                        case "TIME":
                            newRowTr.append('<td style="' + colStyle + '">' + (ProbusUtility.IsNullOrEmpty(data[item.index]) ? "" : moment(data[item.index], 'hh:mm:ss').format(UserConfiguration.SystemTimeFormat())) + '</td>');
                            break;
                        case "DATETIME":
                            displayName = "";
                            if (!ProbusUtility.IsNullOrEmpty(item.TimeZoneValueFromRow) && ProbusUtility.IsNullOrEmpty(displayName)) { displayName = data[item.TimeZoneValueFromRow]; }
                            if (!ProbusUtility.IsNullOrEmpty(item.TimeZoneValue) && ProbusUtility.IsNullOrEmpty(displayName)) { displayName = TimeZoneValue; }
                            if (ProbusUtility.IsNullOrEmpty(displayName)) { displayName = ProbusUtility.ToString(data["DisplayName"], ""); }
                            newRowTr.append('<td style="' + colStyle + '">' + ConvertJsonDateTimeString(data[item.index], displayName) + '</td>');
                            break;
                        case "BOOLEAN":
                            newRowTr.append('<td style="' + colStyle + '">' + (data[item.index] ? "Yes" : "No") + '</td>');
                            break;
                        case "NUMBER":
                            newRowTr.append('<td style="' + colStyle + '">' + (ProbusUtility.IsNullOrEmpty(item.FloatingPoint) ? data[item.index] : ProbusUtility.ToDecimal(data[item.index], 0).toFixed(item.FloatingPoint)) + '</td>');
                            break;
                        case "CURRENCY":
                            newRowTr.append('<td style="' + colStyle + '">' + StaticConfig.CurrencySymbol + data[item.index] + '</td>');
                            break;
                        default:
                            var tempIndexSplit = item.index.split(" ");
                            if (tempIndexSplit.length === 1) {
                                newRowTr.append('<td style="' + colStyle + '">' + (ProbusUtility.IsNullOrEmpty(data[item.index]) ? "" : data[item.index]) + '</td>');
                            } else if (tempIndexSplit.length === 2) {
                                newRowTr.append('<td style="' + colStyle + '">' + data[tempIndexSplit[0]] + " " + data[tempIndexSplit[1]] + '</td>');
                            }
                    }
                }
            });

            if (!ProbusUtility.IsUndefined(objOptions.ActionMenu) && !ProbusUtility.IsUndefined(objOptions.ActPer)) {
                if (objOptions.ActPer.length > 0) {
                    var strUpdate = '<td class="table-row-actions">';
                    $.each(objOptions.ActionMenu, function (_in, _obj) {
                        var tempBtn = '';
                        if (objOptions.ActPer.includes("EWHSKAE62T") && _obj.Title.toUpperCase() === "EDIT") {
                            tempBtn += '<a href="' + _obj.ActionUrl + '?';
                            var cnt = 0;
                            $.each(_obj.ParaArray, function (_pin, _pobj) {
                                tempBtn += ((cnt > 0 ? "&" : "")) + _pobj.EditId + '=' + data[_pobj.EditIndex];
                                cnt++;
                            });
                            tempBtn += '" title="Edit" class="btn btn-sm btn-outline-primary"><i class="fa fa-fw fa-pencil"></i></a>';
                        }
                        else if (objOptions.ActPer.includes("RUSLBAJU9E") && _obj.Title.toUpperCase() === "REMOVE") {
                            var extParam = "";
                            if (_obj.DataExtParam !== undefined || _obj.DataExtParam !== null) {
                                $.each(_obj.DataExtParam, function (__in, __obj) {
                                    if (__obj.Index !== undefined) {
                                        extParam = extParam + "data-" + __obj.Index + " = " + "'" + data[__obj.Index] + "'";
                                    } else if (__obj.Key !== undefined) {
                                        if (typeof __obj.Value === "string")
                                            extParam = extParam + "data-" + __obj.Key + " = " + "'" + __obj.Value + "'";
                                        else
                                            extParam = extParam + "data-" + __obj.Key + " = " + "'" + JSON.stringify(__obj.Value) + "'";
                                    }
                                    else if (__obj.ConfrimMessage !== undefined) {
                                        extParam = extParam + "data-message= " + "'" + __obj.ConfrimMessage + "'";
                                    }
                                    else if (__obj.GridReloadFn !== undefined) {
                                        extParam = extParam + "data-fn-callback= " + "'" + __obj.GridReloadFn + "'";
                                    }
                                });
                            }
                            tempBtn += '<a href="javascript:;" data-row-id="' + unqid + '" ' + extParam;
                            if (typeof _obj.OnClick === "string") {
                                tempBtn += ' onClick="javascript:' + _obj.OnClick + '"';
                            }
                            tempBtn += ' title="Remove" class="btn btn-sm btn-outline-danger"><i class="fa fa-fw fa-trash"></i></a>';
                        }
                        strUpdate += tempBtn;
                    });
                    strUpdate = strUpdate + '</td>';
                    newRowTr.append(strUpdate);
                }
            }
            tBody.append(newRowTr);
        });
        if (objOptions.Paging) {
            //Pagination
            if (objOptions.StartIndex === 0) {
                $('#' + objOptions.Pagination).pagination({
                    pages: result.TotalPages,
                    cssStyle: 'dataTables_paginate paging_simple_numbers',
                    displayedPages: 5,
                    onPageClick: function (pageNumber, event) {
                        objOptions.StartIndex = pageNumber - 1;
                        ProbusGrid(objOptions);
                        return false;
                    }
                });
            }
        }
        try {
            $("#" + objOptions.DataTable).DataTable().destroy();
        } catch (e) {
        }
        $.fn.dataTable.moment(UserConfiguration.DateTimeFormat());
        $("#" + objOptions.DataTable).DataTable({
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": true,
            "order": ProbusUtility.IsNullOrEmpty(objOptions.Order) ? [[0, "asc"]] : objOptions.Order
        });
    },
    RemoveDataFromGrid: function (ojOptions) {
        if (!ProbusUtility.IsUndefined(ojOptions.dataset.ajaxUrl)) {
            var postData = {};
            if (!ProbusUtility.IsUndefined(ojOptions.dataset.ajaxData)) {
                var objectData = JSON.parse(ojOptions.dataset.ajaxData);
                postData = {
                    __RequestVerificationToken: objectData.find(x => x.Key === "Token").Value
                };
                $.each(objectData, function (__in, __obj) {
                    if (__obj.Key !== "Token") {
                        if (__obj.Source === "data") {
                            postData[__obj.Key] = ojOptions.dataset[__obj.Value.toLowerCase()];
                        } else if (__obj.Source === "static") {
                            postData[__obj.Key] = __obj.Value;
                        }
                    }
                });
                swal({
                    icon: 'warning',
                    title: 'Are you sure?',
                    text: ojOptions.dataset.message,
                    buttons: {
                        confirm: {
                            text: "Yes, Remove",
                            value: true,
                            visible: true,
                            className: "btn btn-lg btn-outline-primary",
                            closeModal: true
                        },
                        cancel: {
                            text: "Cancel",
                            value: false,
                            visible: true,
                            className: "btn btn-lg btn-outline-danger",
                            closeModal: true,
                        }
                    }
                }).then((isConfirm) => {
                    if (isConfirm) {
                        $.ajax({
                            url: ojOptions.dataset.ajaxUrl,
                            type: 'POST',
                            data: postData,
                            async: false,
                            complete: function (response) {
                                if (response.status === 200) {
                                    ProbusFunction.ShowMessage({ Message: response.responseText, Type: "success" });
                                    if (!ProbusUtility.IsUndefined(ojOptions.dataset.fnCallback)) {
                                        window[ojOptions.dataset.fnCallback]();
                                    }
                                }
                                else {
                                    ProbusFunction.ShowMessage({ Message: response.statusText, Type: "error" });
                                }
                            }
                        });
                    }
                });
            }
        }
    }
};

function ConvertJsonDateString(jsonDate, DisplayName) {
    return ProbusUtility.DateToDisplayString(jsonDate, DisplayName);
}
function ConvertJsonDateTimeString(jsonDate, DisplayName) {
    return ProbusUtility.DateToDisplayDateTimeString(jsonDate, DisplayName);
}

var ProbusNumberFormatter = {
    maskRegex: /[0-9\-+#]/,
    notMaskRegex: /[^\d\-+#]/g,
    getIndex: function (mask) {
        return mask.search(this.maskRegex);
    },
    processMask: function (mask = "#.##") {
        const maskObj = {};
        const len = mask.length;
        const start = this.getIndex(mask);
        maskObj.prefix = start > 0 ? mask.substring(0, start) : "";

        // Reverse string: not an ideal method if there are surrogate pairs
        const end = this.getIndex(mask.split("").reverse().join(""));
        const offset = len - end;
        const substr = mask.substring(offset, offset + 1);
        // Add 1 to offset if mask has a trailing decimal/comma
        const indx = offset + ((substr === "." || (substr === ",")) ? 1 : 0);
        maskObj.suffix = end > 0 ? mask.substring(indx, len) : "";

        maskObj.mask = mask.substring(start, indx);
        maskObj.maskHasNegativeSign = maskObj.mask.charAt(0) === "-";
        maskObj.maskHasPositiveSign = maskObj.mask.charAt(0) === "+";

        // Search for group separator & decimal; anything not digit,
        // not +/- sign, and not #
        let result = maskObj.mask.match(this.notMaskRegex);
        // Treat the right most symbol as decimal
        maskObj.decimal = (result && result[result.length - 1]) || ".";
        // Treat the left most symbol as group separator
        maskObj.separator = (result && result[1] && result[0]) || ",";

        // Split the decimal for the format string if any
        result = maskObj.mask.split(maskObj.decimal);
        maskObj.integer = result[0];
        maskObj.fraction = result[1];
        return maskObj;
    },
    processValue: function (value, maskObj, options) {
        let isNegative = false;
        const valObj = {
            value
        };
        if (value < 0) {
            isNegative = true;
            // Process only abs(), and turn on flag.
            valObj.value = -valObj.value;
        }

        valObj.sign = isNegative ? "-" : "";

        // Fix the decimal first, toFixed will auto fill trailing zero.
        valObj.value = Number(valObj.value).toFixed(maskObj.fraction && maskObj.fraction.length);
        // Convert number to string to trim off *all* trailing decimal zero(es)
        valObj.value = Number(valObj.value).toString();

        // Fill back any trailing zero according to format
        // look for last zero in format
        const posTrailZero = maskObj.fraction && maskObj.fraction.lastIndexOf("0");
        let [valInteger = "0", valFraction = ""] = valObj.value.split(".");
        if (!valFraction || (valFraction && valFraction.length <= posTrailZero)) {
            valFraction = posTrailZero < 0
                ? ""
                : (Number("0." + valFraction).toFixed(posTrailZero + 1)).replace("0.", "");
        }

        valObj.integer = valInteger;
        valObj.fraction = valFraction;
        this.addSeparators(valObj, maskObj);

        // Remove negative sign if result is zero
        if (valObj.result === "0" || valObj.result === "") {
            // Remove negative sign if result is zero
            isNegative = false;
            valObj.sign = "";
        }

        if (!isNegative && maskObj.maskHasPositiveSign) {
            valObj.sign = "+";
        } else if (isNegative && maskObj.maskHasPositiveSign) {
            valObj.sign = "-";
        } else if (isNegative) {
            valObj.sign = options && options.enforceMaskSign && !maskObj.maskHasNegativeSign
                ? ""
                : "-";
        }

        return valObj;
    },
    addSeparators: function (valObj, maskObj) {
        valObj.result = "";
        // Look for separator
        const szSep = maskObj.integer.split(maskObj.separator);
        // Join back without separator for counting the pos of any leading 0
        const maskInteger = szSep.join("");

        const posLeadZero = maskInteger && maskInteger.indexOf("0");
        if (posLeadZero > -1) {
            while (valObj.integer.length < (maskInteger.length - posLeadZero)) {
                valObj.integer = "0" + valObj.integer;
            }
        } else if (Number(valObj.integer) === 0) {
            valObj.integer = "";
        }

        // Process the first group separator from decimal (.) only, the rest ignore.
        // get the length of the last slice of split result.
        const posSeparator = (szSep[1] && szSep[szSep.length - 1].length);
        if (posSeparator) {
            const len = valObj.integer.length;
            const offset = len % posSeparator;
            for (let indx = 0; indx < len; indx++) {
                valObj.result += valObj.integer.charAt(indx);
                // -posSeparator so that won't trail separator on full length
                if (!((indx - offset + 1) % posSeparator) && indx < len - posSeparator) {
                    valObj.result += maskObj.separator;
                }
            }
        } else {
            valObj.result = valObj.integer;
        }

        valObj.result += (maskObj.fraction && valObj.fraction)
            ? maskObj.decimal + valObj.fraction
            : "";
        return valObj;
    },
    Format: function (mask, value, options = {}) {
        if (!mask || isNaN(Number(value))) {
            // Invalid inputs
            return value;
        }

        const maskObj = this.processMask(mask);
        const valObj = this.processValue(value, maskObj, options);
        return maskObj.prefix + valObj.sign + valObj.result + maskObj.suffix;
    }
}