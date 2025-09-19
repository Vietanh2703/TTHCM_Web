import React, { useState, useEffect, useMemo, useCallback } from 'react'
import './QuizPage.css';

type Choice = {
    id: string
    text: string
}

type Question = {
    id: string
    text: string
    choices: Choice[]
    correctId: string
    explanation?: string
}

const questionBank: Question[] = [
    {
        id: 'q1',
        text: 'Vì sao Hồ Chí Minh nói “con người là vốn quý nhất” trong cách mạng ?',
        choices: [
            { id: 'a', text: 'Vì con người là nguồn lực tinh thần, vật chất để xây dựng xã hội.' },
            { id: 'b', text: 'Vì con người sở hữu tư liệu sản xuất quan trọng.' },
            { id: 'c', text: 'Vì con người là tài sản của Nhà nước.' },
            { id: 'd', text: 'Vì con người không thể bị thay thế bằng máy móc.' },
        ],
        correctId: 'a',
        explanation: 'Con người là lực lượng quyết định mọi hoạt động xã hội — cả về sáng tạo, lao động và tinh thần.'
    },
    {
        id: 'q2',
        text: 'Đâu là quan điểm của Hồ Chí Minh về xây dựng con người ?',
        choices: [
            { id: 'a', text: 'Con người cụ thể, văn hóa' },
            { id: 'b', text: 'Con người cụ thể, lịch sử' },
            { id: 'c', text: 'Con người cụ thể, xã hội' },
            { id: 'd', text: 'Con người lịch sử, văn hóa' },
        ],
        correctId: 'b',
        explanation: 'quan điểm “con người cụ thể, lịch sử” của Hồ Chí Minh thể hiện lập trường duy vật lịch sử, gắn việc xây dựng con người mới với hoàn cảnh xã hội, nhiệm vụ cách mạng, và điều kiện phát triển thực tế của dân tộc trong từng thời kỳ.'
    },
    {
        id: 'q3',
        text: 'Theo Hồ Chí Minh, không phải mọi con người đều trở thành động lực, mà phải là những con người',
        choices: [
            { id: 'a', text: 'Có đạo đức' },
            { id: 'b', text: 'Có năng lực' },
            { id: 'c', text: 'Có trình độ và hiểu biết' },
            { id: 'd', text: 'Được giác ngộ và tổ chức.' },
        ],
        correctId: 'd',
        explanation: 'Theo Hồ Chí Minh, không phải mọi con người tự nhiên đã là động lực, mà chỉ khi được giác ngộ về lý tưởng cách mạng và đặt trong tổ chức cách mạng thì sức mạnh của họ mới phát huy hiệu quả, tạo thành động lực to lớn thúc đẩy sự nghiệp cách mạng.'
    },
    {
        id: 'q4',
        text: 'Đâu là quan điểm của Hồ Chí Minh về chiến lược trồng người ?',
        choices: [
            { id: 'a', text: '"Trồng người" là trung tâm phát triển của nhân loại' },
            { id: 'b', text: '"Trồng người" là trung tâm của phát triển xã hội' },
            { id: 'c', text: '"Trồng người" là trung tâm phát triển thế giới' },
            { id: 'd', text: 'Không có đáp án đúng' },
        ],
        correctId: 'b',
        explanation: 'Hồ Chí Minh coi “Trồng người” là chiến lược trung tâm của phát triển xã hội vì con người vừa là mục tiêu vừa là động lực của cách mạng; bồi dưỡng thế hệ mới chính là bảo đảm cho sự phát triển bền vững, lâu dài của dân tộc và đất nước.'
    },
    {
        id: 'q5',
        text: 'Chiến lược trồng người được Hồ Chí Minh xác định ở vị trí nào trong sự phát triển kinh tế xã hội?',
        choices: [
            { id: 'a', text: 'Cơ bản' },
            { id: 'b', text: 'Trọng tâm' },
            { id: 'c', text: 'Quan trọng' },
            { id: 'd', text: 'Cần thiết' },
        ],
        correctId: 'a',
        explanation: 'Chiến lược trồng người được Hồ Chí Minh xác định ở vị trí cơ bản trong sự phát triển kinh tế xã hội'
    },
    {
        id: 'q6',
        text: 'Yêu thương con người được Hồ Chí Minh xác định là một trong những phẩm chất đạo đức cao đẹp nhất. Người nói, người cách mạng là người giàu tình cảm, có tình cảm cách mạng:',
        choices: [
            { id: 'a', text: 'mới đi làm cách mạng.' },
            { id: 'b', text: 'mới yêu thương con người.' },
            { id: 'c', text: 'mới là người cách mạng.' },
        ],
        correctId: 'a',
        explanation: 'Người cách mạng là người giàu tình cảm, có tình cảm cách mạng mới đi làm cách mạng'
    },
    {
        id: 'q7',
        text: 'Khái niệm con người trong tư tưởng Hồ Chí Minh để chỉ:',
        choices: [
            { id: 'a', text: 'Một con người cụ thể.' },
            { id: 'b', text: 'Một cộng đồng người.' },
            { id: 'c', text: 'Con người cụ thể gắn với hoàn cảnh lịch sử cụ thể.' },
            { id: 'd', text: 'Tất cả các phương án.' },
        ],
        correctId: 'c',
        explanation: 'Con người trong tư tưởng Hồ Chí Minh để chỉ con người cụ thể gắn với hoàn cảnh lịch sử cụ thể.'
    },
    {
        id: 'q8',
        text: 'Hồ Chí Minh xem xét con người trong sự thống nhất của hai mặt đối lập: thiện và ác, hay và dở, tốt và xấu , hiền và dữ,... nhưng:',
        choices: [
            { id: 'a', text: '"dù là xấu, tốt, văn minh hay dã man đều có lý"' },
            { id: 'b', text: '"dù là xấu, tốt, văn minh hay dã man đều có tình"' },
            { id: 'c', text: '"dù là xấu, tốt, văn minh hay dã man đều có đức"' },
            { id: 'd', text: '"dù là xấu, tốt, văn minh hay dã man đều có học"' },
        ],
        correctId: 'b',
        explanation: 'Theo Hồ Chí Minh, trong mỗi con người luôn tiềm ẩn yếu tố tốt đẹp, có thể đánh thức và phát huy; nhờ tình thương và giáo dục đúng đắn, con người sẽ được cảm hóa, hướng thiện và trở thành người có ích cho xã hội.'
    },
    {
        id: 'q9',
        text: 'Con người trong quan điểm của Hồ Chí Minh được nhìn nhận như một:',
        choices: [
            { id: 'a', text: 'Chỉnh thể' },
            { id: 'b', text: 'Tế bào' },
            { id: 'c', text: 'Xã hội' },
            { id: 'd', text: 'Cộng đồng' },
        ],
        correctId: 'a',
        explanation: 'Con người trong quan điểm của Hồ Chí Minh được nhìn nhận như một chỉnh thể.'
    },
    {
        id: 'q10',
        text: 'Theo tư tưởng Hồ Chí Minh, con người Việt Nam trong thời đại mới phải có',
        choices: [
            { id: 'a', text: '3 phẩm chất cơ bản' },
            { id: 'b', text: '4 phẩm chất cơ bản' },
            { id: 'c', text: '5 phẩm chất cơ bản' },
            { id: 'd', text: '6 phẩm chất cơ bản' },
        ],
        correctId: 'b',
        explanation: 'Theo tư tưởng Hồ Chí Minh, con người Việt Nam trong thời đại mới phải có 4 phẩm chất cơ bản sau:\n' +
            '\n' +
            'Có tinh thần yêu nước, yêu chủ nghĩa xã hội – trung thành với Tổ quốc, đặt lợi ích dân tộc và nhân dân lên trên hết.\n' +
            '\n' +
            'Có đạo đức cách mạng trong sáng – cần, kiệm, liêm, chính, chí công vô tư; sống nhân ái, vị tha, vì tập thể.\n' +
            '\n' +
            'Có năng lực, trình độ, tri thức và sức khỏe – giỏi chuyên môn, kỹ thuật, không ngừng học tập, lao động sáng tạo, có ý chí vươn lên.\n' +
            '\n' +
            'Có lối sống văn hóa, nếp sống lành mạnh – giản dị, trong sáng, tôn trọng kỷ luật, giữ gìn bản sắc dân tộc, tiếp thu tinh hoa nhân loại.'
    },
    {
        id: 'q11',
        text: 'Theo Hồ Chí Minh, con người luôn có xu hướng vươn lên cái Chân - Thiện - Mỹ, mặc dù:',
        choices: [
            { id: 'a', text: '"có thế này, có thế khác"' },
            { id: 'b', text: '"có giàu, có nghèo"' },
            { id: 'c', text: '"có thiện, có ác "' },
            { id: 'd', text: '"có sang, có hèn "' },
        ],
        correctId: 'a',
        explanation: '"có thế này, có thế khác"'
    },
    {
        id: 'q12',
        text: 'Hồ Chí Minh ví tuổi trẻ như:',
        choices: [
            { id: 'a', text: 'Mùa xuân của xã hội' },
            { id: 'b', text: 'Mùa xuân của đất nước' },
            { id: 'c', text: 'Mùa xuân của Đảng' },
            { id: 'd', text: 'Mùa xuân của Nhà nước' },
        ],
        correctId: 'b',
        explanation: 'Hồ Chí Minh ví tuổi trẻ như mùa xuân của đất nước.'
    },
    {
        id: 'q13',
        text: 'Theo Hồ Chí Minh, để thực hiện chiến lược "trồng người", cần có nhiều biện pháp, nhưng biện pháp quan trọng bậc nhất là',
        choices: [
            { id: 'a', text: 'Thuyết phục - nêu gương' },
            { id: 'b', text: 'Cảm hóa - động viên' },
            { id: 'c', text: 'Giáo dục - đào tạo' },
            { id: 'd', text: 'Ép buộc - cưỡng chế' },
        ],
        correctId: 'c',
        explanation: 'Giáo dục - đào tạo'
    },
    {
        id: 'q14',
        text: 'Hồ Chí Minh khẳng định sức mạnh của Đảng bắt nguồn từ:',
        choices: [
            { id: 'a', text: 'Con người' },
            { id: 'b', text: 'Tổ chức' },
            { id: 'c', text: 'Dân tộc' },
        ],
        correctId: 'a',
        explanation: 'Hồ Chí Minh khẳng định sức mạnh của Đảng bắt nguồn từ con người.'
    },
    {
        id: 'q15',
        text: 'Theo Hồ Chí Minh, nội dung nào không đúng để phát huy động lực con người:',
        choices: [
            { id: 'a', text: 'Phát huy sức mạnh đoàn kết của cả cộng đồng dân tộc.' },
            { id: 'b', text: 'Phát huy sức mạnh của cá nhân con người.' },
            { id: 'c', text: 'Phát huy các yếu tố chính trị, tinh thần.' },
        ],
        correctId: 'b',
        explanation: 'Phát huy sức mạnh của cá nhân con người. (sai)'
    },
    {
        id: 'q16',
        text: 'Giải phóng con người theo tư tưởng Hồ Chí Minh là:',
        choices: [
            { id: 'a', text: 'Giải phóng con người với tư cách từng cá nhân' },
            { id: 'b', text: 'Giải phóng con người với tư cách là cả loài người.' },
            { id: 'c', text: 'Giải phóng con người với tư cách từng cá nhân và cả loài người.' },
            { id: 'd', text: 'Giải phóng những người bị bóc lột.' },
        ],
        correctId: 'c',
        explanation: 'Giải phóng con người với tư cách từng cá nhân và cả loài người.'
    },
    {
        id: 'q17',
        text: 'Tư tưởng sau của Hồ Chí Minh được thể hiện ở đâu ?"Quyền bình đẳng cá nhân của con người theo dân chủ tư sản Pháp và Mỹ đã trở thành quyền bình đẳng của các cá nhân, các dân tộc trên toàn thế giới"',
        choices: [
            { id: 'a', text: 'Trong Chính Cương vắn tắt.' },
            { id: 'b', text: 'Trong Hiến pháp 1946.' },
            { id: 'c', text: 'Trong Tuyên ngôn Độc lập.' },
            { id: 'd', text: 'Trong Di chúc.' },
        ],
        correctId: 'c',
        explanation: 'Trong Tuyên ngôn, Người đã trích dẫn Tuyên ngôn Độc lập của Mỹ (1776) và Tuyên ngôn Nhân quyền và Dân quyền của Pháp (1789), rồi phát triển thành chân lý thời đại: không chỉ con người có quyền bình đẳng, mà các dân tộc trên thế giới cũng có quyền bình đẳng, tự do, quyền mưu cầu hạnh phúc.'
    },
    {
        id: 'q18',
        text: 'Chủ tịch Hồ Chí Minh quan niệm con người ở mấy nghĩa?',
        choices: [
            { id: 'a', text: 'Một nghĩa duy nhất' },
            { id: 'b', text: 'Hai nghĩa' },
            { id: 'c', text: 'Ba nghĩa' },
            { id: 'd', text: 'Bốn nghĩa' },
        ],
        correctId: 'c',
        explanation: 'Con người được hiểu ở nghĩa hẹp (cá nhân), nghĩa rộng (cộng đồng) và nghĩa rộng hơn (nhân loại).'
    },
    {
        id: 'q19',
        text: '“Máu nào cũng là máu, người nào cũng là người” thể hiện tư tưởng gì?',
        choices: [
            { id: 'a', text: 'Tình thương yêu con người' },
            { id: 'b', text: 'Chủ nghĩa dân tộc' },
            { id: 'c', text: 'Tinh thần đấu tranh giai cấp' },
            { id: 'd', text: 'Ý chí kiên cường' },
        ],
        correctId: 'a',
        explanation: 'Khẳng định sự bình đẳng, nhân đạo, không phân biệt.'
    },
    {
        id: 'q20',
        text: '“Thắng không kiêu, bại không nản” nhấn mạnh phẩm chất gì?',
        choices: [
            { id: 'a', text: 'Cứng nhắc' },
            { id: 'b', text: 'Khiêm tốn, kiên trì' },
            { id: 'c', text: 'Bảo thủ' },
            { id: 'd', text: 'Phô trương' },
        ],
        correctId: 'b',
        explanation: 'Thái độ bình tĩnh, cầu thị trong mọi tình huống.'
    },
    {
        id: 'q21',
        text: 'Đâu là quan điểm của Hồ Chí Minh về quyền con người ?',
        choices: [
            { id: 'a', text: 'Quyền con người độc lập với dân tộc' },
            { id: 'b', text: 'Chỉ có quyền công dân' },
            { id: 'c', text: 'Quyền con người quan trọng hơn độc lập' },
            { id: 'd', text: 'Độc lập dân tộc là điều kiện để có quyền con người' },
        ],
        correctId: 'd',
        explanation: 'Độc lập dân tộc gắn chặt với quyền con người.'
    },
    {
        id: 'q21',
        text: 'Đâu là quan điểm của Hồ Chí Minh về quyền con người ?',
        choices: [
            { id: 'a', text: 'Quyền con người độc lập với dân tộc' },
            { id: 'b', text: 'Chỉ có quyền công dân' },
            { id: 'c', text: 'Quyền con người quan trọng hơn độc lập' },
            { id: 'd', text: 'Độc lập dân tộc là điều kiện để có quyền con người' },
        ],
        correctId: 'd',
        explanation: 'Độc lập dân tộc gắn chặt với quyền con người.'
    },
    {
        id: 'q22',
        text: 'Hồ Chí Minh coi giáo dục – đào tạo là gì trong xây dựng con người?',
        choices: [
            { id: 'a', text: 'Một biện pháp phụ' },
            { id: 'b', text: 'Biện pháp quan trọng bậc nhất' },
            { id: 'c', text: 'Hoạt động văn hóa đơn thuần' },
            { id: 'd', text: 'Công việc lâu dài nhưng không cấp bách' },
        ],
        correctId: 'b',
        explanation: 'Người nói “Vì lợi ích trăm năm thì phải trồng người”'
    },
    {
        id: 'q23',
        text: 'Quan niệm về con người xã hội chủ nghĩa bao gồm những yếu tố nào ?',
        choices: [
            { id: 'a', text: 'Tài năng và sức khỏe' },
            { id: 'b', text: 'Đạo đức, trí tuệ, bản lĩnh, tác phong, lòng nhân ái' },
            { id: 'c', text: 'Của cải vật chất' },
            { id: 'd', text: 'Địa vị xã hội' },
        ],
        correctId: 'b',
        explanation: 'Đạo đức, trí tuệ, bản lĩnh, tác phong, lòng nhân ái.'
    },
    {
        id: 'q24',
        text: 'Tại sao Hồ Chí Minh gắn xây dựng con người với xây dựng văn hóa ?',
        choices: [
            { id: 'a', text: 'Văn hóa chỉ để giải trí' },
            { id: 'b', text: 'Văn hóa chỉ phục vụ lễ hội' },
            { id: 'c', text: 'Văn hóa là nền tảng tinh thần, định hướng nhân cách' },
            { id: 'd', text: 'Văn hóa thay thế chính trị' },
        ],
        correctId: 'c',
        explanation: 'Văn hóa và con người luôn gắn bó chặt chẽ.'
    },
    {
        id: 'q25',
        text: 'Hồ Chí Minh cho rằng, muốn có độc lập dân tộc và chủ nghĩa xã hội, phải dựa vào đâu',
        choices: [
            { id: 'a', text: 'Sự lãnh đạo của một cá nhân kiệt xuất' },
            { id: 'b', text: 'Nguồn viện trợ quốc tế' },
            { id: 'c', text: 'Phát triển vũ khí hiện đại' },
            { id: 'd', text: 'Sức mạnh đoàn kết của toàn dân' },
        ],
        correctId: 'd',
        explanation: 'Độc lập và CNXH phải dựa trên sức mạnh nhân dân.'
    },
    {
        id: 'q26',
        text: 'Vai trò của con người trong quan hệ quốc tế theo Hồ Chí Minh là gì?',
        choices: [
            { id: 'a', text: 'Con người là nền tảng cho đoàn kết, hòa bình, hữu nghị' },
            { id: 'b', text: 'Con người chỉ là công cụ ngoại giao' },
            { id: 'c', text: 'Con người không liên quan đến ngoại giao' },
            { id: 'd', text: 'Chỉ lãnh đạo mới có vai trò' },
        ],
        correctId: 'a',
        explanation: 'Người coi trọng tình người, nhân phẩm làm nền tảng đoàn kết quốc tế.'
    },
    {
        id: 'q27',
        text: 'Hồ Chí Minh khẳng định “Con người là vốn quý nhất” có ý nghĩa sâu xa nào trong tư tưởng của Người?',
        choices: [
            { id: 'a', text: 'Khẳng định vai trò của con người như một nguồn lực sản xuất quan trọng ngang hàng với vốn và tài nguyên.' },
            { id: 'b', text: 'Con người quý giá vì là sản phẩm hoàn thiện nhất của tự nhiên và văn hóa, nhưng chủ yếu mang ý nghĩa đạo đức, nhân văn.' },
            { id: 'c', text: 'Con người là yếu tố trung tâm, vừa là mục tiêu phát triển, vừa là động lực của mọi tiến trình cách mạng và xây dựng xã hội mới.' },
            { id: 'd', text: 'Ý muốn nhấn mạnh con người là tài sản đặc biệt của Đảng, cần được quản lý và sử dụng hợp lý.' },
        ],
        correctId: 'c',
        explanation: 'Hồ Chí Minh không chỉ xem con người như một nguồn lực sản xuất hay một giá trị đạo đức trừu tượng, mà Người khẳng định con người là trung tâm của mọi chính sách và hành động cách mạng: mọi sự nghiệp cách mạng là vì con người và chỉ có thể thành công nhờ con người. Đây là quan niệm nhất quán, làm nền tảng cho tư tưởng “lấy dân làm gốc” và “trồng người” lâu dài.'
    },
    {
        id: 'q28',
        text: 'Hồ Chí Minh nhấn mạnh yếu tố nào là “cái gốc” của con người?',
        choices: [
            { id: 'a', text: 'Trí tuệ' },
            { id: 'b', text: 'Sức khỏe' },
            { id: 'c', text: 'Tài sản' },
            { id: 'd', text: 'Đạo đức' },
        ],
        correctId: 'd',
        explanation: 'Người coi đạo đức là nền tảng để hoàn thiện nhân cách.'
    },
    {
        id: 'q29',
        text: 'Hồ Chí Minh khẳng định vai trò nào của cán bộ trong công việc?',
        choices: [
            { id: 'a', text: 'Người quản lý bộ máy' },
            { id: 'b', text: 'Người ban phát lợi ích' },
            { id: 'c', text: 'Người thay thế nhân dân' },
            { id: 'd', text: 'Gốc của mọi công việc' },
        ],
        correctId: 'd',
        explanation: 'Cán bộ quyết định thành bại, là cầu nối giữa Đảng và dân.'
    },
    {
        id: 'q30',
        text: 'Trong tư tưởng Hồ Chí Minh, câu hiểu nào sau đây phản ánh chính xác nhất mối quan hệ giữa giải phóng dân tộc và giải phóng con người ?',
        choices: [
            { id: 'a', text: 'Giải phóng dân tộc và giải phóng con người là hoàn toàn đồng nhất về nội dung và thời điểm — nói khác đi, làm một là tự động có cả hai.' },
            { id: 'b', text: 'Giải phóng con người có thể thực hiện trước, tức nâng cao quyền lợi và ý thức cá nhân rồi mới dẫn đến độc lập dân tộc; thứ tự có thể đảo ngược.' },
            { id: 'c', text: 'Giải phóng dân tộc và giải phóng con người là hai mục tiêu độc lập; có thể thực hiện song song hoặc tách rời mà không phụ thuộc lẫn nhau.' },
            { id: 'd', text: 'Giải phóng dân tộc là điều kiện tiền đề cần thiết, còn giải phóng con người là mục tiêu bao trùm cuối cùng; hai quá trình tương hỗ nhưng mang thứ tự lịch sử và logic.' },
        ],
        correctId: 'd',
        explanation: 'Trong thực tiễn tư tưởng và hành động của Người, giải phóng dân tộc và giải phóng con người bổ trợ lẫn nhau — chiến đấu giành độc lập để bảo vệ quyền con người; đồng thời xây dựng xã hội mới để con người thật sự được giải phóng. Do đó cần cả hai, nhưng về thứ tự và tính logic, độc lập thường là điều kiện cần trước khi đạt được giải phóng con người toàn diện.'
    },
]

const QuizSystem: React.FC = () => {
    const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro')
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 phút = 1200 giây
    const [, setTimer] = useState<number | null>(null);

    const selectRandomQuestions = useCallback(() => {
        const shuffled = [...questionBank].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, 20)
    }, [])

    // Tính điểm
    const score = useMemo(() => {
        return questions.reduce((acc, q) => acc + (answers[q.id] === q.correctId ? 1 : 0), 0)
    }, [answers, questions])

    // Timer
    useEffect(() => {
        let interval: number | null = null

        if (phase === 'quiz' && timeLeft > 0) {
            interval = window.setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleSubmit()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }

        return () => {
            if (interval) window.clearInterval(interval)
        }
    }, [phase, timeLeft])

    // Auto save answers to prevent loss
    useEffect(() => {
        if (phase === 'quiz' && Object.keys(answers).length > 0) {
            const autoSave = setTimeout(() => {
                // Auto-save logic could be implemented here
            }, 2000)
            return () => clearTimeout(autoSave)
        }
    }, [answers, phase])

    // Xử lý thoát trang/tab
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (phase === 'quiz' && document.hidden) {
                handleReset()
            }
        }

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (phase === 'quiz') {
                e.preventDefault()
                return 'Bạn có chắc muốn thoát? Tiến trình làm bài sẽ mất.'
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [phase])

    const handleStart = () => {
        const selectedQuestions = selectRandomQuestions()
        setQuestions(selectedQuestions)
        setAnswers({})
        setCurrentIndex(0)
        setTimeLeft(20 * 60)
        setPhase('quiz')
    }

    const handleAnswer = (questionId: string, choiceId: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: choiceId }))
    }

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }

    const handleSubmit = () => {
        setPhase('result')
    }

    const handleReset = () => {
        setPhase('intro')
        setQuestions([])
        setAnswers({})
        setCurrentIndex(0)
        setTimeLeft(20 * 60)
        setTimer(null);
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const getAnsweredCount = () => {
        return Object.keys(answers).length
    }
    const getQuestionStatus = (index: number) => {
        const question = questions[index]
        if (!question) return 'unanswered'

        if (answers[question.id]) return 'answered'
        if (index === currentIndex) return 'current'
        return 'unanswered'
    }

    // Trang giới thiệu
    if (phase === 'intro') {
        return (
            <div className="quiz-container">
                <div className="intro-card">
                    <h1 className="intro-title">TRẮC NGHIỆM TƯ TƯỞNG HỒ CHÍ MINH</h1>

                    <div className="intro-rules">
                        <h2>📋 Quy định</h2>
                        <ul>
                            <li><strong>Thời gian:</strong> 20 phút</li>
                            <li><strong>Số câu:</strong> 20 câu</li>
                            <li><strong>Lưu ý:</strong> Không được thoát trang trong khi làm bài</li>
                        </ul>
                    </div>

                    <div className="intro-actions">
                        <button className="start-btn" onClick={handleStart}>
                            BẮT ĐẦU
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Trang làm bài
    if (phase === 'quiz') {
        const currentQuestion = questions[currentIndex]

        return (
            <div className="quiz-container">
                <div className="quiz-layout">
                    <div className="quiz-main">
                        <div className="quiz-header">
                            <h1>Câu {currentIndex + 1}/{questions.length}</h1>
                        </div>

                        <div className="question-card">
                            <div className="question-text">{currentQuestion.text}</div>
                        </div>

                        <div className="choices-container">
                            {currentQuestion.choices.map((choice) => {
                                const isSelected = answers[currentQuestion.id] === choice.id
                                return (
                                    <button
                                        key={choice.id}
                                        className={`choice-btn ${isSelected ? 'selected' : ''}`}
                                        onClick={() => handleAnswer(currentQuestion.id, choice.id)}
                                    >
                                        <span className="choice-bullet">
                                            {choice.id.toUpperCase()}.
                                        </span>
                                        <span className="choice-text">{choice.text}</span>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="navigation-buttons">
                            <button
                                className="nav-btn prev-btn"
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                            >
                                ← Trước
                            </button>

                            {currentIndex < questions.length - 1 ? (
                                <button className="nav-btn next-btn" onClick={handleNext}>
                                    Sau →
                                </button>
                            ) : (
                                <button className="submit-btn" onClick={handleSubmit}>
                                    NỘP BÀI
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="quiz-sidebar">
                        <div className={`timer ${timeLeft < 300 ? 'warning' : ''}`}>
                            <div className="timer-text">{formatTime(timeLeft)}</div>
                        </div>

                        <div className="question-grid">
                            <div className="grid-container">
                                {questions.map((_, index) => {
                                    const status = getQuestionStatus(index)
                                    return (
                                        <button
                                            key={index}
                                            className={`grid-item ${status}`}
                                            onClick={() => setCurrentIndex(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="progress-info">
                            Đã làm: {getAnsweredCount()}/{questions.length}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Trang kết quả
    if (phase === 'result') {
        const percentage = Math.round((score / questions.length) * 100)
        const getGrade = (percent: number) => {
            if (percent >= 90) return { grade: 'Xuất sắc', color: '#4caf50', emoji: '🏆' }
            if (percent >= 80) return { grade: 'Giỏi', color: '#8bc34a', emoji: '🌟' }
            if (percent >= 70) return { grade: 'Khá', color: '#ffc107', emoji: '👍' }
            if (percent >= 50) return { grade: 'Trung bình', color: '#ff9800', emoji: '📚' }
            return { grade: 'Yếu', color: '#f44336', emoji: '💪' }
        }

        const gradeInfo = getGrade(percentage)

        return (
            <div className="quiz-container">
                <div className="result-card">
                    <div className="result-header">
                        <h1>KẾT QUẢ</h1>

                        <div className="score-display" style={{ backgroundColor: gradeInfo.color }}>
                            <div className="score-emoji">{gradeInfo.emoji}</div>
                            <div className="score-value">{score}/{questions.length} ({percentage}%)</div>
                            <div className="score-grade">{gradeInfo.grade}</div>
                        </div>
                    </div>

                    <div className="result-details">
                        <h2>Chi tiết</h2>

                        {questions.map((question, index) => {
                            const userAnswer = answers[question.id]
                            const isCorrect = userAnswer === question.correctId
                            const correctChoice = question.choices.find(c => c.id === question.correctId)
                            const userChoice = question.choices.find(c => c.id === userAnswer)

                            return (
                                <div key={question.id} className={`answer-review ${isCorrect ? 'correct' : 'incorrect'}`}>
                                    <div className="review-header">
                                        <span className="question-index">Câu {index + 1}</span>
                                        <span className={`result-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                                            {isCorrect ? '✓' : '✗'}
                                        </span>
                                    </div>

                                    <div className="review-question">{question.text}</div>

                                    <div className="review-answers">
                                        <div className="answer-row">
                                            <strong>Bạn chọn:</strong> {userChoice?.text || 'Chưa trả lời'}
                                        </div>
                                        <div className="answer-row correct-answer">
                                            <strong>Đáp án:</strong> {correctChoice?.text}
                                        </div>
                                    </div>

                                    {question.explanation && (
                                        <div className="explanation">
                                            {question.explanation}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <div className="result-actions">
                        <button className="action-btn retry-btn" onClick={handleReset}>
                            LÀM LẠI
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return null
}

export default QuizSystem
